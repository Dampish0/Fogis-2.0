import express from "express";
import { createArena, deleteArena, getArenaById, getArenas, updateArena } from "../controllers/arenaController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { getAuthRoleMiddleware } from "../middleware/verifyAuthorityLevel.js";
import ratelimiter from "../middleware/ratelimiter.js";

const router = express.Router();

let createArenaAllowedRoles = ["admin", "superadmin", "dev"];
let updateArenaAllowedRoles = ["admin", "superadmin", "dev"];
let deleteArenaAllowedRoles = ["admin", "superadmin", "dev"];

router.post("/", verifyToken, getAuthRoleMiddleware(createArenaAllowedRoles), createArena);
router.get("/", verifyToken, getArenas);
router.get("/:id", verifyToken, getArenaById);
router.put("/:id", verifyToken, getAuthRoleMiddleware(updateArenaAllowedRoles), updateArena);
router.delete("/:id", verifyToken, getAuthRoleMiddleware(deleteArenaAllowedRoles), ratelimiter, deleteArena);

export default router;
