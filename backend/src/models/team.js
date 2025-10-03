import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },
    clubId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club',
        required: true,
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
        required: true,
    },
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

    homeArena: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Arena',
    }

}, {timestamps: true})