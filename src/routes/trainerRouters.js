const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs');


router.get('/', (req, res) => {
  db.all('SELECT id, name, specialty, plain_password as password FROM trainers', [], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao buscar professores' });
    }
    res.json(rows);
  });
});


router.post('/', async (req, res) => {
  const { name, specialty, password } = req.body;
  if (!name || !specialty || !password) return res.status(400).json({ error: 'Todos os campos são obrigatórios' });

  try {
    const hash = await bcrypt.hash(password, 10);
    db.run(
      'INSERT INTO trainers (name, specialty, password, plain_password) VALUES (?, ?, ?, ?)',
      [name, specialty, hash, password],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, name, specialty });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao salvar professor' });
  }
});


router.put('/api/trainers/:id', async (req, res) => {
  const { id } = req.params;
  const { name, specialty, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);

    db.run(
      `UPDATE trainers 
       SET name = ?, specialty = ?, password = ?, plain_password = ?
       WHERE id = ?`,
      [name, specialty, hash, password, id],
      function (err) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Erro ao atualizar professor' });
        }
        res.json({ message: 'Professor atualizado com sucesso!' });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar professor' });
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM trainers WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

module.exports = router;
