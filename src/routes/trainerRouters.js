const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs'); // bcrypt para hash da senha

// GET all trainers
router.get('/', (req, res) => {
  db.all('SELECT id, name, specialty FROM trainers', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});


router.post('/', (req, res) => {
    const { name, specialty, password } = req.body;
    if (!name || !specialty || !password) return res.status(400).json({ error: 'Todos os campos são obrigatórios' });

    db.run(
        'INSERT INTO trainers (name, specialty, password) VALUES (?, ?, ?)',
        [name, specialty, password],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID, name, specialty });
        }
    );
});

// PUT update trainer
router.put('/:id', async (req, res) => {
  try {
    const { name, specialty, password } = req.body;
    const { id } = req.params;

    const params = [name, specialty];
    let query = 'UPDATE trainers SET name = ?, specialty = ?';

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      query += ', password = ?';
      params.push(hashedPassword);
    }

    query += ' WHERE id = ?';
    params.push(id);

    db.run(query, params, function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE trainer
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM trainers WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

module.exports = router;
