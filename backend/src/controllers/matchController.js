import { Match } from '../models/match.js';
import { Team } from '../models/team.js';
import { Player } from '../models/player.js';
import { Referee } from '../models/referee.js';
import Agenda from '../config/agendaConfig.js';

Agenda.define('fetch lineups', async (job) => {
    const { matchId } = job.attrs.data;
    // Your logic to fetch/lock lineups for this match

    const HomeTeam = await Match.findById(matchId).populate('homeTeam');
    const AwayTeam = await Match.findById(matchId).populate('awayTeam');

    const HomeLineup = HomeTeam.lineup;
    const AwayLineup = AwayTeam.lineup;

    const match = await Match.findById(matchId);
    match.homeTeamLineup = HomeLineup;
    match.awayTeamLineup = AwayLineup;
    await match.save();


    console.log(`Fetching lineups for match ${matchId}`);
});

export async function createMatch(req, res)
{
    try{
        const {homeTeam, awayTeam, matchDate, location, arena, referees} = req.body;
        if(!homeTeam || !awayTeam || !matchDate || !location || !arena || !referees){
            throw new Error("All Fields are required.")
        }

        const newMatch = new Match({
            homeTeam,
            awayTeam,
            date: matchDate,
            location,
            arena,
            referees,
        });

        await newMatch.save();

        // Schedule the lineup job 30 minutes before match
        const matchTime = new Date(matchDate);
        const lineupTime = new Date(matchTime.getTime() - 30 * 60000);
        await Agenda.schedule(lineupTime, 'fetch lineups', { matchId: newMatch._id });

        res.status(201).json({
            success: true,
            message: "Match created successfully.",
            Match: newMatch
        });
    } catch (error) {
        console.error("Error in createMatch: ", error.message);
        res.status(500).json({success: false, message: "Error in createMatch.", err: error.message});
    }
}


// To save database calls, we use pagination and filtering and by default get the latest matches with pagination
export async function getMatches(req, res)
{
    const { page = 1, limit = 10, ...filters } = req.query;

    try {
        const user = req.reqUser;
        const role = user.role;
        const clubId = user.clubId;

        // if the user is a trainer, only get Match if their club is involved
        if(role === "trainer"){
            const teams = await Team.find({ club: clubId });
            const teamIds = teams.map(team => team._id);
            filters.$or = [
                { homeTeam: { $in: teamIds } },
                { awayTeam: { $in: teamIds } }
            ];
        }

        const query = Match.find(filters).sort({ date: -1 }).skip((page - 1) * limit).limit(limit);
        const matches = await query;
        const totalMatches = await Match.countDocuments(filters);

        res.status(200).json({
            success: true,
            matches,
            totalPages: Math.ceil(totalMatches / limit),
            currentPage: page
        });
    } catch (error) {
        console.error("Error in getAllMatches: ", error.message);
        res.status(500).json({ success: false, message: "Error in getAllMatches.", err: error.message });
    }
}

export async function getMatchById(req, res)
{
    try{
        const matchId = req.params.id;
        const match = await Match.findById(matchId);

        const user = req.reqUser;
        const role = user.role;
        const clubId = user.clubId;

        // club has teams and user has a club
        const teams = await Team.find({ club: clubId });

        // if the user is a trainer, only get match if their club is involved
        if(role === "trainer"){
            if(!match){
                return res.status(404).json({success: false, message: "Match not found."});
            }
            const isClubInvolved = teams.some(team => team._id.equals(match.homeTeam) || team._id.equals(match.awayTeam));
            if(!isClubInvolved){
                return res.status(403).json({success: false, message: "You are not authorized to view this match."});
            }
        }

        res.status(200).json({ success: true, match });
    } catch (error) {
        console.error("Error in getMatchById: ", error.message);
        res.status(500).json({ success: false, message: "Error in getMatchById.", err: error.message });
    }
}



const AllowedEventFieldsForReferee = [
                'SUSPEND_X_GAMES',

                'goal',
                'assist',
                'own_goal',
                'yellow_card',
                'red_card',
                'substitution',
                'penalty',
                'offside',
                'injury',
                'VAR_review',
                'extra_time',
                'cooling_break',
                'end_half',
                'start_half',
                'end_match',
                'disallowed_goal',
                'other',
            ];

export async function updateMatch(req, res)
{
    try{
        const matchId = req.params.id;
        const updates = req.body;
        const user = req.reqUser;
        const role = user.role;
        
        const match = await Match.findById(matchId);
        if(!match){
            return res.status(404).json({success: false, message: "Match not found."});
        }
        const status = match.status;

        // referee can only update certain fields
        if(role === "referee"){
            if(status === "completed"){
                return res.status(403).json({success: false, message: "You are not authorized to update a completed match."});
            }

            //check fields in newEvent
            const {time, type, team, player, assistingPlayer, description, backendData} = updates.newEvent;

            switch(type){
                case 'goal':
                    await incrementScore(match, team);
                    await addEvent(match, { time, type, team, player, assistingPlayer, description });
                    break;
                case 'own_goal':
                    await incrementScore(match, team === match.homeTeam ? match.awayTeam : match.homeTeam);
                    await addEvent(match, { time, type, team, player, assistingPlayer, description });
                    break;
                case 'yellow_card':
                    await addEvent(match, { time, type, team, player, assistingPlayer, description });
                break;
                case 'red_card':
                    await handleRedCard(match, player, backendData);
                    await addEvent(match, { time, type, team, player, assistingPlayer, description });
                    break;
                break;
                case 'end_match':
                    match.status = 'pending_completion';
                    await addEvent(match, { time, type, team, player, assistingPlayer, description });
                    await match.save();
                break;
                case 'finish_match_report':
                    match.status = 'completed';
                    await match.save();
                break;
                case 'substitution':
                case 'injury':
                case 'VAR_review':
                case 'extra_time':
                case 'cooling_break':
                case 'end_half':
                case 'start_half':

                case 'disallowed_goal':
                case 'other':
                    await addEvent(match, { time, type, team, player, assistingPlayer, description });
                    break;
                default:
                    return res.status(400).json({success: false, message: "Invalid event type."});
                    
            }
            await match.save();
            return res.status(200).json({ success: true, message: "Match updated successfully.", match });
        }

        // admin can update all fields
        if(role === "admin" || role === "superadmin" || role === "dev"){
            Object.keys(updates).forEach(key => {
                match[key] = updates[key];
            });
        }
        await match.save();

        res.status(200).json({ success: true, message: "Match updated successfully.", match });

    }catch (error) {
        console.error("Error in updateMatch: ", error.message);
        res.status(500).json({ success: false, message: "Error in updateMatch.", err: error.message });
    }
}

export async function deleteMatch(req, res)
{
    try{
        const matchId = req.params.id;
        const role = req.reqUser.role;
        if(role !== "admin" && role !== "superadmin" && role !== "dev"){
            return res.status(403).json({success: false, message: "You are not authorized to delete a match."});
        }

        const match = await Match.findByIdAndDelete(matchId);
        if(!match){
            return res.status(404).json({success: false, message: "Match not found."});
        }
        res.status(200).json({ success: true, message: "Match deleted successfully." });
    } catch (error) {
        console.error("Error in deleteMatch: ", error.message);
        res.status(500).json({ success: false, message: "Error in deleteMatch.", err: error.message });
    }
}