import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    try{
        const token = req.cookies.authtoken;
        if(!token){
            return res.status(401).json({success:false, message: "Åtkomst nekad. ingen cookie angiven."});
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({success:false, message: "Åtkomst nekad. ogiltig cookie angiven."});
        }

        req.userId = decoded.userId;

        next();
    }
    catch(error){
        console.log("error in verifyToken middleware, server.js", error);
        return res.status(401).json({success:false, message: "Åtkomst nekad. error i verifyToken, server."});
    }
}