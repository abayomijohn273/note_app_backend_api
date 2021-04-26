module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');

    // Create a new Note
    app.post('/notes', notes.create);

    // Retrieve all notes
    app.get('/notes', notes.findAll);

    // Retrieve single note
    app.get('notes/:noteId', notes.findOne);

    // Update a note
    app.put('/notes/:notedId', notes.update);

    // Delete a note
    app.delete('/notes/:noteId', notes.delete);
}