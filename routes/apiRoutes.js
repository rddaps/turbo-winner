const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const uniqid = require('uniqid'); 

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../db/db.json'));
});

router.post('/notes', (req, res) => {
        const db = JSON.parse(fs.readFileSync('./db/db.json'))
        const newNote = {
            title: req.body.title,
            text: req.body.text,
            id: uniqid(),
        };
        console.log(newNote);
    db.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(db));
    res.json(db);
});

router.delete('/notes/:id', (req, res) => {
    const db = JSON.parse(fs.readFileSync('./db/db.json'));
    const notes = db.filter((note) => note.id !== req.params.id);

    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    res.json('Note deleted.');
});

module.exports = router;