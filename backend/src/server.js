import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import {connectDB} from "./config/db.js";
import dotenv from "dotenv";
import ratelimiter from "./middleware/ratelimiter.js";
import cookieparser from "cookie-parser";
import cors from "cors";

dotenv.config();
const port = process.env.PORT || 5001;

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(express.json()); // <-- This parses JSON bodies
app.use(ratelimiter);
app.use(cookieparser());


app.use((req, res, next) => {
    console.log(`req method is ${req.method}, Req url is ${req.url}`);
    next();
})

//app.use("/api/notes", notesRoutes)
app.use("/api/auth", authRoutes)



connectDB().then(() =>
{
    app.listen(port, () => {
    console.log("Server at 5001");
    });
});




//mongodb+srv://eliasdovkrans_db_user:h4n2jwrg8eA4HjbV@cluster0.b1ayp6m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0