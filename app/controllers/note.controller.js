const Notes = require("../models/note.models");

// Create and save a note
exports.create = (req, res) => {
    //Validate request
    if (!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        })
    }

    // Create a note
    const note = new Notes({
        title: req.body.title || "Untitled Note",
        content: req.body.content
    })

    // Save Note to database
    note.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        })
    })

}

// Retrieve and return all notes from database
exports.findAll = (req, res) => {
    Notes.find().then((notes) => {
        res.send(notes)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        })
    })

}

// Find a single note wih a noteId
exports.findOne= (req, res) => {
    Notes.findById(req.params.noteId).then(note => {
        if (!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            })
        }

        res.send(note);
    }).catch(err => {
        if (err.kind === "ObjectId") {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            })
        }

        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.noteId
        })
    })

}

// update a note
exports.update = (req, res) => {
    // Validate request
    if (!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        })
    }

    // Find the note and update
    Notes.findByIdAndUpdate(req.params.noteId, {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    }, {
        new: true
    }).then(note => {
        if (!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            })
        }
        res.send(note);
    }).catch(err => {
        if (err.kind === "ObjectId") {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            })
        }

        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.noteId
        })
    })
}

// delete a note
exports.delete = (req, res) => {
    Notes.findByIdAndRemove(req.params.noteId).then(note => {
        if (!notes) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            })
        }

        res.send({
            message: "Note deleted successfully!"
        });
    }).catch(err => {
        if (err.kind === "ObjectId" || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            })
        }

        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        })
    })

}