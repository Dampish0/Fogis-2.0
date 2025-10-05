import express from "express";
import { createReferee, deleteReferee, getRefereeById, getReferees, updateReferee } from "../controllers/refereeController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { getAuthRoleMiddleware } from "../middleware/verifyAuthorityLevel.js";
import ratelimiter from "../middleware/ratelimiter.js";

const router = express.Router();

let createRefereeAllowedRoles = ["admin", "superadmin", "dev"];
let getAllRefereeAllowedRoles = ["admin", "superadmin", "dev"];
let updateRefereeAllowedRoles = ["admin", "superadmin", "dev", "referee"];
let deleteRefereeAllowedRoles = ["admin", "superadmin", "dev"];

router.post("/", verifyToken, getAuthRoleMiddleware(createRefereeAllowedRoles), createReferee);
router.get("/", verifyToken, getAuthRoleMiddleware(getAllRefereeAllowedRoles), getReferees);
router.get("/:id", verifyToken, getRefereeById);
router.put("/:id", verifyToken, getAuthRoleMiddleware(updateRefereeAllowedRoles), updateReferee);
router.delete("/:id", verifyToken, getAuthRoleMiddleware(deleteRefereeAllowedRoles), ratelimiter, deleteReferee);

export default router;
