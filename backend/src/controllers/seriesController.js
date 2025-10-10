import {Series} from "../models/series.js";
import { Team } from "../models/team.js";
import { Match } from "../models/match.js";

export async function createSeries(req, res)
{
    try{
        const { name, description, teams, startDate, endDate, gender, ageGroup, level } = req.body;
        const series = new Series({ name, description, teams, startDate, endDate, gender, ageGroup, level });
        await series.save();
        res.status(201).json(series);
    }catch(error){
        console.error("Error creating series:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getSeries(req, res)
{
    const { page = 1, limit = 40, ...filters } = req.query;
    try{
        const series = await Series.find(filters).skip((page - 1) * limit).limit(limit).populate('teams', 'name');
        res.status(200).json(series);
    }catch(error){
        console.error("Error fetching series:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getSeriesById(req, res)
{
    try{
        const { id } = req.params;
        const series = await Series.findById(id).populate('teams', 'name');
        if (!series) {
            return res.status(404).json({ message: "Series not found" });
        }
        res.status(200).json(series);
    }catch(error){
        console.error("Error fetching series:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function updateSeries(req, res)
{
    try{
        const { id } = req.params;
        const updates = req.body;
        const series = await Series.findByIdAndUpdate(id, updates, { new: true }).populate('teams', 'name');
        if (!series) {
            return res.status(404).json({ message: "Series not found" });
        }
        res.status(200).json(series);
    }catch(error){
        console.error("Error updating series:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function recalculateStandings(seriesId) {
    try {
        const series = await Series.findById(seriesId).populate('teams', 'name');
        if (!series) {
            throw new Error("Series not found");
        }

        // Initialize standings
        const standingsMap = new Map();
        series.teams.forEach(team => {
            standingsMap.set(team._id.toString(), {
                team: team._id,
                points: 0,
                scoreDifference: 0,
                playedGames: 0,
                wins: 0,
                draws: 0,
                losses: 0
            });
        });

        // Fetch all matches in the series
        await series.populate({
            path: 'matches',
            match: { status: 'completed' },
            select: 'homeTeam awayTeam homeScore awayScore winner status',
        });

        if (!Array.isArray(series.matches)) {
            throw new Error("No matches found for this series");
        }
        series.matches.forEach(match => {
                const homeTeamId = match.homeTeam.toString();
                const awayTeamId = match.awayTeam.toString();
                const homeScore = match.homeScore;
                const awayScore = match.awayScore;
                const winner = match.winner;
                standingsMap.get(homeTeamId).playedGames += 1;
                standingsMap.get(awayTeamId).playedGames += 1;

                //score difference
                standingsMap.get(homeTeamId).scoreDifference += homeScore - awayScore;
                standingsMap.get(awayTeamId).scoreDifference += awayScore - homeScore;

                if (winner==="home") {
                    standingsMap.get(homeTeamId).points += 3;
                    standingsMap.get(homeTeamId).wins += 1;
                    standingsMap.get(awayTeamId).losses += 1;
                } else if (winner==="away") {
                    standingsMap.get(awayTeamId).points += 3;
                    standingsMap.get(awayTeamId).wins += 1;
                    standingsMap.get(homeTeamId).losses += 1;
                } else if(winner==="draw") {
                    standingsMap.get(homeTeamId).points += 1;
                    standingsMap.get(awayTeamId).points += 1;
                    standingsMap.get(homeTeamId).draws += 1;
                    standingsMap.get(awayTeamId).draws += 1;
                }
                else{
                    console.error("Error in recalculating standings:", match);
                    return;
                }
            });

        const standingsArray = Array.from(standingsMap.values());
        standingsArray.sort((a, b) => {
            if (b.points !== a.points) {
                return b.points - a.points; // Sort by points descending
            }
            return b.scoreDifference - a.scoreDifference; // Then by score difference descending
        });
        series.standings = standingsArray;
        await series.save();
        return series;
    } catch (error) {
        console.error("Error recalculating standings:", error);
        throw new Error("Internal server error");
    }
}

export async function deleteSeries(req, res)
{
    try{
        const { id } = req.params;
        const series = await Series.findByIdAndDelete(id);
        if (!series) {
            return res.status(404).json({ message: "Series not found" });
        }
        res.status(204).send();
    }catch(error){
        console.error("Error deleting series:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}