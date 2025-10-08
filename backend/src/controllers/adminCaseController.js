import { AdminCase } from "../models/adminCase.js";

export async function createAdminCase(req, res)
{
    try{
        const { caseType, description, filedBy, involvedPlayers, matchOfIncident } = req.body;
        const adminCase = new AdminCase({ caseType, description, filedBy, involvedPlayers, matchOfIncident });
        await adminCase.save();
        res.status(201).json(adminCase);
    }catch(error){
        console.error("Error creating admin case:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getAdminCases(req, res)
{
    const { page = 1, limit = 10, ...filters } = req.query;
    try{
        // get admin cases that have not been asigned yet and if they are in review dont show them
        // if dev or superadmin show all
        const role = req.reqUser.Role;

        const adminCases = await AdminCase.find({ ...filters })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate("matchOfIncident", "date homeTeam awayTeam")
            


        res.status(200).json(adminCases);
    }catch(error){
        console.error("Error fetching admin cases:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getAdminCaseById(req, res)
{
    try{
        const { id } = req.params;
        const role = req.reqUser.role;
        const adminCase = await AdminCase.findById(id)
            .populate("caseAsignedTo", "name email role")
            .populate("filedBy", "name email role")
            .populate("involvedPlayers", "name number teamId")
            .populate("matchOfIncident", "date homeTeam awayTeam");

        if(role !== "superadmin" && role !== "dev" && role !== "admin"){
            if(adminCase.filedBy != req.reqUser._id){
                return res.status(403).json({ message: "Du har ej behörighet att se detta ärende." });
            }
        }
        if (!adminCase) {
            return res.status(404).json({ message: "Admin case not found" });
        }
        res.status(200).json(adminCase);
    }catch(error){
        console.error("Error fetching admin case:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function updateAdminCase(req, res)
{
    try{
        const { id } = req.params;
        const updates = req.body;
        const requester = req.reqUser;
        const role = requester.role;

        //make sure updates only contains allowed fields
        // status, resolution, caseAsignedTo
        const allowedFields = ["status", "resolution", "caseAsignedTo"];
        Object.keys(updates).forEach(key => {
            if (!allowedFields.includes(key)) {
                delete updates[key];
            }
        });

        if(adminCase.status === "open" && (role !== "superadmin" && role !== "dev")){
            return res.status(403).json({ message: "Ärendet är inte bundet till en handläggare." });
        }

        const adminCase = await AdminCase.findById(id);
        const caseAsignedTo = adminCase.caseAsignedTo;
        if(adminCase.status === "in_review"){
            if((requester._id !== caseAsignedTo) ||  role !== "superadmin" || role !== "dev"){
                return res.status(403).json({ message: "Du har ej befogenhet att ändra detta ärende." });
            }
        }

        adminCase.changedLog.push({
            changedBy: requester._id,
            changeDate: Date.now(),
            changes: updates
        });

        Object.assign(adminCase, updates);
        await adminCase.save();

        if (!adminCase) {
            return res.status(404).json({ message: "Hittade inte ärendet" });
        }
        res.status(200).json(adminCase);
    }catch(error){
        console.error("Error updating admin case:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function claimAdminCase(req, res)
{
    try{
        const { id } = req.params;
        const requester = req.reqUser;
        const role = requester.role;
        if(role !== "superadmin" && role !== "dev" && role !== "admin"){
            return res.status(403).json({ message: "Du har ej befogenhet att ta detta ärende." });
        }
        const adminCase = await AdminCase.findById(id);
        if (!adminCase) {
            return res.status(404).json({ message: "Hittade inte ärendet" });
        }
        if(adminCase.status !== "open"){
            return res.status(400).json({ message: "Ärendet är redan påbörjat eller avslutat." });
        }
        adminCase.caseAsignedTo = requester._id;
        adminCase.status = "in_review";
        adminCase.changedLog.push({
            changedBy: requester._id,
            changeDate: Date.now(),
            changes: { caseAsignedTo: requester._id, status: "in_review" }
        });
        await adminCase.save();
        res.status(200).json(adminCase);
    }catch(error){
        console.error("Error claiming admin case:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}