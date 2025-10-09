import { Player } from "../models/player.js";
import { Club } from "../models/club.js";
import { Team } from "../models/team.js";
import { AdminCase } from "../models/adminCase.js";

export async function createPlayer(req, res)
{
    try{
        const { name, persNmr, shirtNumber, preferedPosition, clubId, teamId } = req.body;
        const player = new Player({ name, persNmr, number:shirtNumber, preferedPosition, clubId, teamId });
        await player.save();

        // Add player to club's players array
        if(clubId){
            const club = await Club.findById(clubId);
            if(club){
                club.players.push(player._id);
                await club.save();
            }
        }

        // Add player to team's players array
        if(teamId){
            const team = await Team.findById(teamId);
            if(team){
                team.players.push(player._id);
                await team.save();
            }
        }

        res.status(201).json(player);
    }catch(error){
        console.error("Error creating player:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getPlayers(req, res)
{
    const { page = 1, limit = 10, ...filters } = req.query;
    try{
        const players = await Player.find(filters)
            .skip((page - 1) * limit)
            .limit(limit)
            .populate("clubId")
            .populate("teamId");
        res.status(200).json(players);
    }catch(error){
        console.error("Error fetching players:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getPlayerById(req, res)
{
    try{
        const { id } = req.params;
        const player = await Player.findById(id).populate("clubId").populate("teamId clubId");
        if(!player){
            return res.status(404).json({ message: "Player not found" });
        }
        res.status(200).json(player);
    }catch(error){
        console.error("Error fetching player:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function updatePlayer(req, res)
{
    try{
        const { id } = req.params;
        const updates = req.body;

        if(updates.clubId){
            return res.status(400).json({ message: "Cannot change clubId through this endpoint." });
        }


        const player = await Player.findByIdAndUpdate(id, updates, { new: true });
        if(!player){
            return res.status(404).json({ message: "Player not found" });
        }
        res.status(200).json(player);
    }catch(error){
        console.error("Error updating player:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function deletePlayer(req, res)
{
    try{
        const { id } = req.params;

        // Remove player from club's players array and team's players array
        const playerToDelete = await Player.findById(id);
        if(playerToDelete){
            if(playerToDelete.clubId){
                const club = await Club.findById(playerToDelete.clubId);
                if(club){
                    club.players = club.players.filter(pId => !pId.equals(playerToDelete._id));
                    await club.save();
                }
            }
            if(playerToDelete.teamId){
                const team = await Team.findById(playerToDelete.teamId);
                if(team){
                    team.players = team.players.filter(pId => !pId.equals(playerToDelete._id));
                    await team.save();
                }
            }
        }

        const player = await Player.findByIdAndDelete(id);
        
        if(!player){
            return res.status(404).json({ message: "Player not found" });
        }
        res.status(204).json();
    }catch(error){
        console.error("Error deleting player:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function updateStatisticPlayer(matchEvents) {
    
}

export async function updatePlayerHistory(matchId, playerIds) {
    try {
        await Player.updateMany(
            { _id: { $in: playerIds } },
            { $addToSet: { history: matchId } }
        );
    } catch (error) {
        console.error("Error updating player history:", error);
    }
}

export async function handleSuspensions(match, events) {

    //we need to file a admin case for each player as main referee

    const filedBy = match.referees.find(r => r.refereeType === 'main')?.referee;

    const redCardedPlayers = events.filter(e => e.type === 'red_card').map(e => e.player);

    const adminCase = new AdminCase({
        caseType: 'Avstängning',
        description: `Rött kort i match ${match._homeTeam} vs ${match.awayTeam} den ${new Date(match.scheduledDate).toLocaleDateString()}`,
        filedBy,
        involvedPlayers: redCardedPlayers,
        matchOfIncident: match._id,
        status: 'open',
    });


    
}