import { Match } from '../models/match.js';
import { Team } from '../models/team.js';
import { User } from '../models/player.js';
import { Referee } from '../models/referee.js';

export async function createReferee(req, res)
{
    try{
        const { name, email, persNmr, prefereedRefereeType } = req.body;
        const referee = new Referee({ name, email, persNmr, prefereedRefereeType });
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
    try{
        const referees = await Referee.find().select("-history");
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
            Referee.findById(id).select("-persNmr")
            :
            Referee.findById(id)).populate('history');

        if (!referee) {
            return res.status(404).json({ message: "Referee not found" });
        }
        res.status(200).json(referee);
    }catch(error){
        console.error("Error fetching referee:", error);
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