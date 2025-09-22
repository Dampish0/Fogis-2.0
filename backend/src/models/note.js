import mongoose from "mongoose";

//1  schema
//2  model

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        }

    },
    {   
        timestamps: true
    }
);

const Note = mongoose.model("Note", noteSchema);

export default Note