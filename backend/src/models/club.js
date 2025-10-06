import mongoose from "mongoose";

const clubSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },
    trainers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }],
    location:{
        type: String,
        required: true,
    },
    established:{
        type: Date,
        required: true,
    },
    logoUrl:{
        type: String,
        required: true,
    },
    phoneNumber:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    adress:{
        type: String,
        required: true,
    },
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
    }],

}, {timestamps: true})

export const Club = mongoose.model('Club', clubSchema);