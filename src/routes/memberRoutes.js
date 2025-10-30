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


router.put('/:id', (req, res) => {
  const { name, email, phone } = req.body;
  const { id } = req.params;

  db.run(
    'UPDATE members SET name = ?, email = ?, phone = ? WHERE id = ?',
    [name, email, phone, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
});


router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM members WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});


module.exports = router;