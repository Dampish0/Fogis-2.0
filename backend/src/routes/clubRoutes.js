import express from "express";
import { createClub, deleteClub, getClubById, getClubs, updateClub } from "../controllers/clubController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { getAuthRoleMiddleware } from "../middleware/verifyAuthorityLevel.js";
import ratelimiter from "../middleware/ratelimiter.js";

const router = express.Router();

let createClubAllowedRoles = ["admin", "superadmin", "dev"];
let updateClubAllowedRoles = ["admin", "superadmin", "dev", "trainer"];
let deleteClubAllowedRoles = ["superadmin", "dev"];

router.post("/", verifyToken, getAuthRoleMiddleware(createClubAllowedRoles), createClub);
router.get("/", verifyToken, getClubs);
router.get("/:id", verifyToken, getClubById);
router.put("/:id", verifyToken, getAuthRoleMiddleware(updateClubAllowedRoles), updateClub);
router.delete("/:id", verifyToken, getAuthRoleMiddleware(deleteClubAllowedRoles), ratelimiter, deleteClub);

export default router;
