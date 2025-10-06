import mongoose from "mongoose";

const seriesSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    standings: [{
        team: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team',
        },
        points: {
            type: Number,
            required: true,
        },
        scoreDifference: {
            type: Number,
            required: true,
        },
        playedGames: {
            type: Number,
            required: true,
        },
        wins: {
            type: Number,
            required: true,
        },
        draws: {
            type: Number,
            required: true,
        },
        losses: {
            type: Number,
            required: true,
        }
    }],
    startDate:{
        type: Date,
        required: true,
    },
    endDate:{
        type: Date,
        required: true,
    },
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true,
    }],

    matches: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Match',
    }],
}, {timestamps: true})

export const Series = mongoose.model('Series', seriesSchema);
