import express from "express";
import { createPlayer, deletePlayer, getPlayerById, getPlayers, updatePlayer } from "../controllers/playerController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { getAuthRoleMiddleware } from "../middleware/verifyAuthorityLevel.js";
import ratelimiter from "../middleware/ratelimiter.js";

const router = express.Router();

let createPlayerAllowedRoles = ["admin", "superadmin", "dev"];
let updatePlayerAllowedRoles = ["admin", "superadmin", "dev", "trainer"];
let deletePlayerAllowedRoles = ["admin", "superadmin", "dev"];

router.post("/", verifyToken, getAuthRoleMiddleware(createPlayerAllowedRoles), createPlayer);
router.get("/", verifyToken, getPlayers);
router.get("/:id", verifyToken, getPlayerById);
router.put("/:id", verifyToken, getAuthRoleMiddleware(updatePlayerAllowedRoles), updatePlayer);
router.delete("/:id", verifyToken, getAuthRoleMiddleware(deletePlayerAllowedRoles), ratelimiter, deletePlayer);

export default router;
