import express from "express";

//routes
import authRoutes from "./routes/authRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import refereeRoutes from "./routes/refereeRoutes.js";
import clubRoutes from "./routes/clubRoutes.js";


import {connectDB} from "./config/db.js";
import dotenv from "dotenv";
import ratelimiter from "./middleware/ratelimiter.js";
import cookieparser from "cookie-parser";
import cors from "cors";
import Agenda from "./config/agendaConfig.js";
import path from "path";

dotenv.config();
const port = process.env.PORT || 5001;

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(express.json()); // <-- This parses JSON bodies
// app.use(ratelimiter);
app.use(cookieparser());

Agenda.start();
app.use("/logos", express.static(path.join(process.cwd(), "public", "logos")));
app.use((req, res, next) => {
    console.log(`req method is ${req.method}, Req url is ${req.url}`);
    next();
})

//app.use("/api/notes", notesRoutes)
app.use("/api/matches", matchRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/referees", refereeRoutes)
app.use("/api/clubs", clubRoutes)




//connect to db and start server
connectDB().then(() =>
{
    app.listen(port, () => {
    console.log("Server at 5001");
    });
});


