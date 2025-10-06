import { Club } from "../models/club.js";
import fs from "fs";
import path from "path";
import sharp from "sharp";

export async function createClub(req, res)
{
    try{
        const { name, trainers, location, established, logo, phoneNumber, email, adress } = req.body;
        if(!name || !trainers || !location || !established || !logo || !phoneNumber || !email || !adress){
            throw new Error("All Fields are required.")
        }

        // convert logo to url
        const logosDir = path.join(process.cwd(), "public", "logos");
        if (!fs.existsSync(logosDir)) {
            fs.mkdirSync(logosDir, { recursive: true });
        }
        const logoBuffer = Buffer.from(logo, "base64");
        const logoFileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}.png`;
        const logoPath = path.join(logosDir, logoFileName);

        await sharp(logoBuffer)
            .resize(512, 512, { fit: "inside", withoutEnlargement: true })
            .toFile(logoPath);

        const logoUrl = `/logos/${logoFileName}`;

        const club = new Club({ name, trainers, location, established, logoUrl, phoneNumber, email, adress });
        await club.save();
        res.status(201).json(club);
    }catch(error){
        console.error("Error creating club:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getClubs(req, res)
{
    const { page = 1, limit = 10, ...filters } = req.query;
    try{
        const clubs = await Club.find(filters).skip((page - 1) * limit).limit(limit);
        res.status(200).json(clubs);
    }catch(error){
        console.error("Error fetching clubs:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getClubById(req, res)
{
    try{
        const { id } = req.params;

        const club = await Club.findById(id).populate('trainers', '-password -resetToken -resetTokenExpiry').populate('teams players');
        if (!club) {
            return res.status(404).json({ message: "Club not found" });
        }
        res.status(200).json(club);
    }catch(error){
        console.error("Error fetching club:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function updateClub(req, res)
{
    try{
        const { id } = req.params;
        const updates = req.body;
        const role = req.reqUser.role;

        // only superadmin, admin and dev can update trainers
        if((role !== "superadmin" && role !== "dev" && role !== "admin") && updates.trainers){
            delete updates.trainers;
        }
        
        const club = await Club.findByIdAndUpdate(id, updates, { new: true });
        if (!club) {
            return res.status(404).json({ message: "Club not found" });
        }
        res.status(200).json(club);
    }catch(error){
        console.error("Error updating club:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function deleteClub(req, res)
{
    try{
        const { id } = req.params;

        const club = await Club.findByIdAndDelete(id);
        if (!club) {
            return res.status(404).json({ message: "Club not found" });
        }
        res.status(204).send();
    }catch(error){
        console.error("Error deleting club:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}