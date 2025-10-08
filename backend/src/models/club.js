import mongoose from "mongoose";

const clubSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    trainers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }],
    location:{
        type: String,
    },
    established:{
        type: Date,
    },
    logoUrl:{
        type: String,
    },
    phoneNumber:{
        type: String,
    },
    email:{
        type: String,
        required: true,
    },
    adress:{
        type: String,
    },
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
    }],
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
    }],

}, {timestamps: true})

export const Club = mongoose.model('Club', clubSchema);