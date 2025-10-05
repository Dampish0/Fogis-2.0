import express from "express";
import { createMatch, deleteMatch, getMatchById, getMatches, updateMatch } from "../controllers/matchController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { getAuthRoleMiddleware } from "../middleware/verifyAuthorityLevel.js";

const router = express.Router();

let createMatchAllowedRoles = ["admin", "superadmin", "dev"];
let getAllMatchesAllowedRoles = ["trainer", "referee", "admin", "superadmin", "dev"];
let updateMatchAllowedRoles = ["admin", "superadmin", "dev", "referee"];
let deleteMatchAllowedRoles = ["admin", "superadmin", "dev"];

router.post("/", verifyToken, getAuthRoleMiddleware(createMatchAllowedRoles), createMatch);
router.get("/", verifyToken, getAuthRoleMiddleware(getAllMatchesAllowedRoles), getMatches);
router.get("/:id", verifyToken, getAuthRoleMiddleware(getAllMatchesAllowedRoles), getMatchById);
router.put("/:id", verifyToken, getAuthRoleMiddleware(updateMatchAllowedRoles), updateMatch);
router.delete("/:id", verifyToken, getAuthRoleMiddleware(deleteMatchAllowedRoles), deleteMatch);

export default router;
