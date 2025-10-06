import express from "express";
import { createSeries, deleteSeries, getSeriesById, getSeries, updateSeries } from "../controllers/seriesController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { getAuthRoleMiddleware } from "../middleware/verifyAuthorityLevel.js";
import ratelimiter from "../middleware/ratelimiter.js";

const router = express.Router();

let createSeriesAllowedRoles = ["admin", "superadmin", "dev"];
let getSeriesAllowedRoles = ["admin", "superadmin", "dev", "trainer"];
let updateSeriesAllowedRoles = ["admin", "superadmin", "dev", "trainer"];
let deleteSeriesAllowedRoles = ["admin", "superadmin", "dev"];

router.post("/", verifyToken, getAuthRoleMiddleware(createSeriesAllowedRoles), createSeries);
router.get("/", verifyToken, getAuthRoleMiddleware(getSeriesAllowedRoles), getSeries);
router.get("/:id", verifyToken, getAuthRoleMiddleware(getSeriesAllowedRoles), getSeriesById);
router.put("/:id", verifyToken, getAuthRoleMiddleware(updateSeriesAllowedRoles), updateSeries);
router.delete("/:id", verifyToken, getAuthRoleMiddleware(deleteSeriesAllowedRoles), ratelimiter, deleteSeries);

export default router;
