import Note from "../models/note.js"


export async function getNoteById(req, res)
{   
    try{
        const updatedNote = await Note.findById(req.params.id);
        if (!updatedNote){
            return res.status(404).json({message:"Note not found"});
        }
        res.status(200).json(updatedNote);
    }
    catch(error){ 
        console.error("Error in getNoteById: ", error)
        res.status(500).json({message: "internal server error"});
    }
}


export async function getAllNotes(_, res)
{   
    try{
        const notes = await Note.find().sort({createdAt: -1});
        res.status(201).json(notes);

    }catch(error){
        console.error("Error in getAllNotes: ", error)
        res.status(500).json({message: "internal server error"});
    }
    
}

export async function createNote(req, res)
{
    try{
        const {title, content} = req.body;
        const newNote = new Note({title, content});

        await newNote.save()

        res.status(201).json(newNote);

    }
    catch(error){
        console.error("Error in createNote: ", error)
        res.status(500).json({message: "internal server error"});
    }
}

export async function updateNote(req, res)
{
        try{
        const {title, content} = req.body;
        
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content}, {new: true});

        if (!updatedNote){
            return res.status(404).json({message:"Note not found"});
        }
        res.status(200).json({message: "note updated"});
    }
    catch(error){ 
        console.error("Error in updateNote: ", error)
        res.status(500).json({message: "internal server error"});
    }
}

export async function deleteNote(req, res)
{
    try{
        const updatedNote = await Note.findByIdAndDelete(req.params.id);

        if (!updatedNote){
            return res.status(404).json({message:"Note not found"});
        }
        res.status(200).json({message: "note yeeted"});
    }
    catch(error){ 
        console.error("Error in deleteNote: ", error)
        res.status(500).json({message: "internal server error"});
    }
}