const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET = 'minha_chave_super_secreta';

router.post('/login', (req, res) => {
  const { name, password } = req.body;

  db.get('SELECT * FROM trainers WHERE name = ?', [name], async (err, trainer) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!trainer) return res.status(401).json({ error: 'Usuário não encontrado' });

    const senhaCorreta = await bcrypt.compare(password, trainer.password);
    if (!senhaCorreta) return res.status(401).json({ error: 'Senha incorreta' });

    const token = jwt.sign(
      { id: trainer.id, name: trainer.name },
      SECRET,
      { expiresIn: '2h' }
    );

    res.json({ message: 'Login realizado com sucesso', token, trainer: { id: trainer.id, name: trainer.name } });
  });
});

module.exports = router;
