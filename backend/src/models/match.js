import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['scheduled', 'in_progress', 'pending_completion', 'completed', 'delayed', 'canceled', 'draw', 'walkover', 'Other'],
        default: 'scheduled',
    },
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        default: null,
    },

    date: {
        type: Date,
        required: true,
    },
    //arena object
    arena: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Arena',
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
            enum: ['main', 'assistant', 'var', 'other'],
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
        eventTypeDataField: {
            type: Number,
            default: 0,
        },
        player: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Player',
        },
        assistingPlayer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Player',
        },
        description: String,
    }],

    series: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Series',
    },

}, {timestamps: true})

export const Match = mongoose.model('Match', matchSchema);
