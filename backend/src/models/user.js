import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    lastLogin:{
        type: Date,
        default: Date.now,
    },
    role:{
        type: String,
        enum: ['trainer', 'referee', 'admin', 'superadmin', 'dev'],
        required: true,
        default: 'trainer',
    },
    // role id, if you are a referee, this is your referee id, if you are a trainer, this is your club id
    refereeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'referee',
        default: null,
    },
    clubId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'club',
        default: null,
    },


    resetPasswordToken: String,
    resetPasswordExpiresAt: String,


}, {timestamps: true})

export const User = mongoose.model('User', userSchema);