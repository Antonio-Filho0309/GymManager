const express = require('express');
const router = express.Router();
const db = require('../db')


router.get('/', (req, res) => {
    db.all('SELECT * FROM members', [], (err, rows) => {
        if (err) return res.status(500).json({error: err.message });
        res.json(rows);
    });
});

router.post('/', (req, res) => {
    const {name, email, phone} = req.body;
    db.run('INSERT INTO  members (name, email, phone) VALUES (?, ?, ?)', [name, email, phone],
        function (err) {
            if (err) return res.status(500).json({ error:err.message});
            res.json({id:this.lastID, name, email, phone });
        });
});

module.exports = router;