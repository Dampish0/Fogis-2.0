import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) =>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "1d"});

    res.cookie("authtoken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        samesite: "strict",
        maxAge: 14 * 24 * 60 * 60 * 1000
    })
}