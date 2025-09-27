import express from "express";
import { createUser, forgotPass, login, logout, resetPass, checkAuth} from "../controllers/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth)

router.post("/createuser", createUser)

router.post("/login", login)

router.post("/logout", logout)

router.post("/forgotpass", forgotPass)

router.post("/resetpass/:token", resetPass)


export default router