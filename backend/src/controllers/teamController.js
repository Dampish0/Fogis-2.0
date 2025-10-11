import { Team } from "../models/team.js";
import { Player } from "../models/player.js";
import { User } from "../models/user.js";
import { Club } from "../models/club.js";
import sharp from "sharp";

export async function createTeam(req, res)
{
    try{
        const { name, clubId, ageGroup, players, logo, address, homeArena } = req.body;

        let logoUrl = "";
        if(logo){
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

            logoUrl = `/logos/${logoFileName}`;
        }

        const team = new Team({ name, club: clubId, ageGroup, players: players || [], logo: logoUrl, address, homeArena });
        await team.save();
        res.status(201).json(team);
    }catch(error){
        console.error("Error creating team:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getTeams(req, res)
{
    const { page = 1, limit = 10, ...filters } = req.query;

    try {

        const requester = req.reqUser;
        const role = requester.role;
        const clubId = requester.clubId;

        // if the user is a trainer, only get teams from their club
        if(role === "trainer"){
            filters.clubId = clubId;
        }

        if (filters.name) {
            filters.name = { $regex: `^${filters.name}`, $options: "i" };
        }

        const teams = await Team.find(filters)
            .skip((page - 1) * limit)
            .limit(limit)
            .populate("clubId players homeArena", "name logo");

        const total = await Team.countDocuments(filters);
        res.status(200).json({ teams, total });
    } catch (error) {
        console.error("Error fetching teams:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getTeamById(req, res)
{
    try{
        const { id } = req.params;
        const requester = req.reqUser.clubId;
        const role = requester.role;

        const team = await Team.findById(id).populate("club players homeArena", "name logo");

        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }

        // only allow access for club members and above
        if (role !== "trainer") {
            const club = await Club.findById(team.clubId);
            const isMember = club && club.trainers.includes(requester._id);
            if (!isMember) {
                return res.status(403).json({ message: "Access denied" });
            }
        }

        res.status(200).json(team);
    } catch (error) {
        console.error("Error fetching team:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function updateTeam(req, res)
{
    try{
        const { id } = req.params;
        const updates = req.body;
        const role = req.reqUser.role;

        // only allow updates for club members and above
        if (role !== "trainer") {
            const team = await Team.findById(id);
            const club = await Club.findById(team.clubId);
            const isMember = club && club.trainers.includes(req.reqUser._id);
            if (!isMember) {
                return res.status(403).json({ message: "Access denied" });
            }
        }

        const team = await Team.findByIdAndUpdate(id, updates, { new: true });
        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }

        res.status(200).json(team);
    } catch (error) {
        console.error("Error updating team:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//admin and above has access
export async function deleteTeam(req, res)
{
    try{
        const { id } = req.params;
        const role = req.reqUser.role;

        const team = await Team.findByIdAndDelete(id);
        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }

        res.status(204).send();
    } catch (error) {
        console.error("Error deleting team:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
