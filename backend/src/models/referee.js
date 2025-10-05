import mongoose from 'mongoose';
//soccer
const refereeSchema = new mongoose.Schema({
    suspended:{
        type: Boolean,
        default: false,
    },

    name:{
        type: String,
        required: true,
    },
    persNmr:{
        type: String,
        required: true,
    },
    PreferedRefereeType:{
        type: String,
        enum: ['main', 'assistant', 'line', 'fourth'],
    },

    history: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Match',
    }],

}, {timestamps: true})

export const Referee = mongoose.model('Referee', refereeSchema);
