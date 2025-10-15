import express from "express";
import { createUser, forgotPass, login, logout, resetPass, checkAuth, sendNotification, readNotification} from "../controllers/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { getAuthRoleMiddleware } from "../middleware/verifyAuthorityLevel.js";
import ratelimiter from "../middleware/ratelimiter.js";

const allowedNotifyRoles = ["admin", "superadmin", "dev"];
const allowedCreateUserRoles = ["admin", "superadmin", "dev"];

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth)

router.post("/createuser", verifyToken, getAuthRoleMiddleware(allowedCreateUserRoles), createUser)

router.post("/login", ratelimiter, login)

router.post("/logout", logout)

router.post("/forgotpass", forgotPass)

router.post("/resetpass/:token", resetPass)

router.post("/notify", verifyToken, getAuthRoleMiddleware(allowedNotifyRoles), ratelimiter, sendNotification)
router.post("/notify/mark-read", verifyToken, readNotification)

export default router