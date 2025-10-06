import {User} from "../models/user.js";
import e from "express";

export function getAuthRoleMiddleware(allowedRoles) {
    return async (req, res, next) => {
        try {
            const userId = req.userId; // Assume req.userId is set by previous auth middleware
            if (!userId) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            if (!allowedRoles.includes(user.role)) {
                return res.status(403).json({ message: "Forbidden, you don't have permission." });
            }

            req.reqUser = user;
            
            next();
        } catch (error) {
            console.error("Error in getAuthRoleMiddleware: ", error.message);
            res.status(500).json({ message: "Error in getAuthRoleMiddleware.", err: error.message });
        }
    };
}
