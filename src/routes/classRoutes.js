const express = require('express');
const router = express.Router();
const db = require('../db')


router.get('/', (req, res) => {
    db.all(
        `SELECT c.*, t.name AS trainer_name 
        FROM classes c 
        LEFT JOIN trainers t ON c.trainer_id = t.id`,
        [],
        (err, rows) => {
        if (err) return res.status(500).json({error: err.message });
        res.json(rows);
    });
});

router.post('/', (req, res) => {
    const {title, trainer_id, schedule} = req.body;
    if (!title || !trainer_id || !schedule){
        return res.status(400).json({error: 'Campos obrigatórios: title, trainer_id, schedule'});
    }

    db.run('INSERT INTO  classes (title, trainer_id, schedule) VALUES (?, ?, ?)', [title, trainer_id, schedule],
        function (err) {
            if (err) return res.status(500).json({ error:err.message});
            res.json({id:this.lastID, title, trainer_id, schedule });
        });
});


router.put('/:id', (req, res) => {
  const { title, trainer_id, schedule } = req.body;
  const { id } = req.params;

  db.run(
    'UPDATE classes SET title = ?, trainer_id = ?, schedule = ? WHERE id = ?',
    [title, trainer_id, schedule, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
});


router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM classes WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});


module.exports = router;