const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./src/db');


const memberRoutes = require('./src/routes/memberRoutes');
const classRoutes = require('./src/routes/classRoutes');
const trainerRoutes = require('./src/routes/trainerRoutes');


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/api/members', memberRoutes);
app.use('/api/class', classRoutes);
app.use('/api/members', trainerRoutes);

const PORT = 3000;
app.listen(PORT, ()=> console.log(`Servidor rodando em http://localhost:${PORT}`));