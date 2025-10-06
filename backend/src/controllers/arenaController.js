import { Arena } from "../models/arena.js";
import { Team } from "../models/team.js";

export async function createArena(req, res)
{
    try {
        const { name, location, capacity } = req.body;

        const arena = new Arena({ name, location, capacity });
        await arena.save();

        res.status(201).json(arena);
    } catch (error) {
        console.error("Error creating arena:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getArenas(req, res)
{
    const { page = 1, limit = 10, ...filters } = req.query;

    try {
        const arenas = await Arena.find(filters)
            .skip((page - 1) * limit)
            .limit(limit)
            .populate('homeTeams', 'name');

        const total = await Arena.countDocuments(filters);
        res.status(200).json({ arenas, total });
    } catch (error) {
        console.error("Error fetching arenas:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getArenaById(req, res)
{
    try {
        const { id } = req.params;
        const arena = await Arena.findById(id).populate('homeTeams', 'name');

        if (!arena) {
            return res.status(404).json({ message: "Arena not found" });
        }

        res.status(200).json(arena);
    } catch (error) {
        console.error("Error fetching arena:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function updateArena(req, res)
{
    try {
        const { id } = req.params;
        const updates = req.body;

        const arena = await Arena.findByIdAndUpdate(id, updates, { new: true });
        if (!arena) {
            return res.status(404).json({ message: "Arena not found" });
        }

        res.status(200).json(arena);
    } catch (error) {
        console.error("Error updating arena:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function deleteArena(req, res)
{
    try {
        const { id } = req.params;
        const arena = await Arena.findByIdAndDelete(id);
        if (!arena) {
            return res.status(404).json({ message: "Arena not found" });
        }

        res.status(204).send();
    } catch (error) {
        console.error("Error deleting arena:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
