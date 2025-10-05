import ratelimit from "../config/upstash.js";

const ratelimiter = async (req, res, next) => {
    try{
        const userId = req.userId;
        const {success} = await ratelimit.limit(userId);
        if (!success){
            return res.status(429).json({message: "Too many requests."});
        }
        next();
    }catch(error){
        console.log("Rate limit error.")
        next(error);
    }
};

export default ratelimiter;