import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    //arena object
    arena: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Arena',
        required: true,
    },
    homeTeam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true,
    },
    awayTeam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true,
    },
    referees: [{
        referee:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Referee',
            required: true,
        },
        refereeType: {
            type: String, // or enum if you have specific types
            required: true,
        }
    }],

    awayTeamLineup: [{
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
    homeTeamLineup: [{
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
    score: {
        home: {
            type: Number,
            default: 0,
        },
        away: {
            type: Number,
            default: 0,
        }
    },
    events: [{
        time: {
            type: Number, // minute of the match
            required: true,
        },
        type: {
            type: String,
            enum: [
                'goal',
                'assist',
                'own_goal',
                'yellow_card',
                'red_card',
                'substitution',
                'penalty',
                'offside',
                'injury',
                'VAR_review',
                'extra_time',
                'cooling_break',
                'end_half',
                'start_half',
                'end_match',
                'disallowed_goal',
                'other',
            ],
            required: true,
        },
        player: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Player',
        },
        assistingPlayer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Player',
        },
        team: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team',
            required: true,
        },
        description: String,
    }],
}, {timestamps: true})

export const Match = mongoose.model('Match', matchSchema);
