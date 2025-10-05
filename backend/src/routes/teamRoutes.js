import express from "express";
import { createTeam, deleteTeam, getTeamById, getTeams, updateTeam } from "../controllers/teamController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { getAuthRoleMiddleware } from "../middleware/verifyAuthorityLevel.js";
import ratelimiter from "../middleware/ratelimiter.js";

const router = express.Router();

let createTeamAllowedRoles = ["admin", "superadmin", "dev"];
let getTeamAllowedRoles = ["admin", "superadmin", "dev", "trainer"];
let updateTeamAllowedRoles = ["admin", "superadmin", "dev", "trainer"];
let deleteTeamAllowedRoles = ["admin", "superadmin", "dev"];

router.post("/", verifyToken, getAuthRoleMiddleware(createTeamAllowedRoles), createTeam);
router.get("/", verifyToken, getAuthRoleMiddleware(getTeamAllowedRoles), getTeams);
router.get("/:id", verifyToken, getAuthRoleMiddleware(getTeamAllowedRoles), getTeamById);
router.put("/:id", verifyToken, getAuthRoleMiddleware(updateTeamAllowedRoles), updateTeam);
router.delete("/:id", verifyToken, getAuthRoleMiddleware(deleteTeamAllowedRoles), ratelimiter, deleteTeam);

export default router;
