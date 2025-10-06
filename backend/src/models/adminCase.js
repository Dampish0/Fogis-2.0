import mongoose from "mongoose";

const adminCaseSchema = new mongoose.Schema({
    caseAsignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    status: {
        type: String,
        enum: ['open', 'in_review', 'closed'],
        default: 'open',
    },

    caseType: {
        type: String,
        enum: ['suspension', 'warning', 'fine', 'report', 'other'],
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    filedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    involvedPlayers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
    }],
    matchOfIncident: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Match',
    },
    resolution: {
        type: String,
    },

    changedLog: [{
        changedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        changeDate: {
            type: Date,
            default: Date.now,
        },
        changes: {
            type: String,
        },
    }],

}, {timestamps: true})

export const AdminCase = mongoose.model('AdminCase', adminCaseSchema);
