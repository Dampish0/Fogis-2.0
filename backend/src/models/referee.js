import mongoose from 'mongoose';
//soccer
const refereeSchema = new mongoose.Schema({
    suspended:{
        type: Boolean,
        default: false,
    },
    PreferedRefereeType:{
        type: String,
        enum: ['main', 'assistant', 'line', 'var', 'other'],
    },
    history: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Match',
        default: []
    }],


    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {timestamps: true})

export const Referee = mongoose.model('Referee', refereeSchema);
