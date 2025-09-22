import mongoose from "mongoose";



export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGO CONNECTED")
    }catch (error){
        console.log("ERROR MONGO NOT CONNECTED", error)
        process.exit(1);
    }
}