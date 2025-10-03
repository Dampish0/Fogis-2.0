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
        enum: ['referee', 'admin', 'superadmin', 'trainer'],
        default: 'user',
    },
    // role id, if you are a referee, this is your referee id, if you are a trainer, this is your club id
    roleId:{
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'role',
    },


    resetPasswordToken: String,
    resetPasswordExpiresAt: String,


}, {timestamps: true})

export const User = mongoose.model('User', userSchema);