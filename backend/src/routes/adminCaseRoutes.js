import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { getAuthRoleMiddleware } from "../middleware/verifyAuthorityLevel.js";
import ratelimiter from "../middleware/ratelimiter.js";
import { createAdminCase, getAdminCases, getAdminCaseById, updateAdminCase, claimAdminCase } from "../controllers/adminCaseController.js";

const router = express.Router();

let getManyAdminCasesAllowedRoles = ["admin", "superadmin", "dev"];
let updateAdminCaseAllowedRoles = ["admin", "superadmin", "dev"];
let claimAdminCaseAllowedRoles = ["admin", "superadmin", "dev"];

router.post("/", verifyToken, createAdminCase);
router.get("/", verifyToken, getAuthRoleMiddleware(getManyAdminCasesAllowedRoles), getAdminCases);
router.get("/:id", verifyToken, getAdminCaseById);
router.put("/:id", verifyToken, getAuthRoleMiddleware(updateAdminCaseAllowedRoles), updateAdminCase);
router.post("/:id/claim", verifyToken, getAuthRoleMiddleware(claimAdminCaseAllowedRoles), ratelimiter, claimAdminCase);

export default router;