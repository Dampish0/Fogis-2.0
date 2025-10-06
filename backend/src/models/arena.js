import mongoose from "mongoose";

const arenaSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    adress:{
        type: String,
        required: true,
    },
    capacity:{
        type: Number,
        required: true,
    },
    indoor:{
        type: Boolean,
        required: true,
    },
    imageUrl:{
        type: String,
    },
    homeTeams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
    }],
}, {timestamps: true})

export const Arena = mongoose.model('Arena', arenaSchema);