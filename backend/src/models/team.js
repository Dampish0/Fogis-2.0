import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    clubId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club',
    },
    ageGroup:{
        type: String,
        required: true,
    },
    teamColors:{
        type: [String], // Array of color hex codes or names
    },
    logoUrl:{
        type: String,
    },
    address:{
        type: String,
        required: true,
    },
    homeArena:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Arena',
    },
    players:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
    }],
    lineup: [{
        player: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Player',
            required: true,
        },
        position: { type: String }, // optional
        coordinates: {
            x: { type: Number, required: true },
            y: { type: Number, required: true }
        }
    }],

}, {timestamps: true})

export const Team = mongoose.model('Team', teamSchema);