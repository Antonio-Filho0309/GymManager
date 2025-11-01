const express = require('express');
const router = express.Router();
const db = require('../db')


router.get('/', (req, res) => {
    db.all('SELECT * FROM trainers', [], (err, rows) => {
        if (err) return res.status(500).json({error: err.message });
        res.json(rows);
    });
});

router.post('/', (req, res) => {
    const {name, specialty} = req.body;
    db.run('INSERT INTO  trainers (name, specialty) VALUES (?, ?)', [name, specialty],
        function (err) {
            if (err) return res.status(500).json({ error:err.message});
            res.json({id:this.lastID, name, specialty});
        });
});


router.put('/:id', (req, res) => {
  const { name, specialty} = req.body;
  const { id } = req.params;

  db.run(
    'UPDATE trainers SET name = ?, specialty = ? WHERE id = ?',
    [name, specialty, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
});


router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM trainers WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});


module.exports = router;