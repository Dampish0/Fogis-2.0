import { Match } from '../models/match.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Referee } from '../models/referee.js';

export async function createReferee(req, res)
{
    try{
        const { name, prefereedRefereeType } = req.body;
        const referee = new Referee({ name, prefereedRefereeType });
        await referee.save();
        res.status(201).json(referee);
    }catch(error){
        console.error("Error creating referee:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//only admin and above has access
export async function getReferees(req, res)
{
    const { page = 1, limit = 10, ...filters } = req.query;
    try{
        const referees = await Referee.find(filters).select("-history").skip((page - 1) * limit).limit(limit);
        res.status(200).json(referees);
    }catch(error){
        console.error("Error fetching referees:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getRefereeById(req, res)
{
    try{
        const role = req.reqUser.role; // Assuming req.reqUser is set by the verifyToken middleware

        const { id } = req.params;

        const referee = await (role != "admin" && role != "superadmin" && role != "dev"
            ?
            Referee.findById(id).select("-persNmr -history")
            :
            Referee.findById(id)).select('-history');

        if (!referee) {
            return res.status(404).json({ message: "Referee not found" });
        }
        res.status(200).json(referee);
    }catch(error){
        console.error("Error fetching referee:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getRefereeMatches(req, res)
{
    try{
        const { id } = req.params;
        const requester = req.reqUser;
        const role = requester.role;
        const { page = 1, limit = 10, ...filters } = req.query;
        filters.referees = id;

        if(role === "referee" && requester.refereeId.toString() !== id){
            return res.status(403).json({ message: "Forbidden" });
        }

        const matches = await Match.find(filters)
            .sort({ date: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate('homeTeam awayTeam winner arena');    
        res.status(200).json(matches);
    }catch(error){
        console.error("Error fetching referee matches:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function updateReferee(req, res)
{
    try{
        const { id } = req.params;
        const updates = req.body;
        const referee = await Referee.findByIdAndUpdate(id, updates, { new: true });
        if (!referee) {
            return res.status(404).json({ message: "Referee not found" });
        }
        res.status(200).json(referee);
    }catch(error){
        console.error("Error updating referee:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export async function deleteReferee(req, res)
{
    try{
        const { id } = req.params;
        const referee = await Referee.findByIdAndDelete(id);
        if (!referee) {
            return res.status(404).json({ message: "Referee not found" });
        }
        res.status(204).send();
    }catch(error){
        console.error("Error deleting referee:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}