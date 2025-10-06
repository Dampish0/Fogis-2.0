import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
    suspendedUntill:{
        type: Number,
        default: 0,
    },
    toBeSuspended:{
        type: Boolean,
        default: false,
    },

    name:{
        type: String,
        required: true,
    },
    // person nummer 8 siffor yyyymmdd
    persNmr:{
        type: String,
        required: true,
    },
    number:{
        type: Number,
        required: true,
    },
    preferedPosition:{
        type: String,
        enum: ['forward', 'midfielder', 'defender', 'goalkeeper'],
    },
    clubId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club',
    },
    teamId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true,
    },
    
    statistics: {
        goals: [{
            goalDate: {
                type: Date,
            },
            goal: {
                type: Number,
                default: 0,
            },
        }],

    },

    history: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Match',
    }],

}, {timestamps: true})

export const Player = mongoose.model('Player', playerSchema);
