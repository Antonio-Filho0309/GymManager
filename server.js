const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./src/db');


const memberRoutes = require('./src/routes/memberRoutes');
const trainerRoutes = require('./src/routes/trainerRouters');
const classRoutes = require('./src/routes/classRoutes'); 
const authRoutes = require('./src/routes/authRoutes');



const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/api/members', memberRoutes);
app.use('/api/trainers', trainerRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/auth', authRoutes);


const PORT = 3000;
app.listen(PORT, ()=> console.log(`Servidor rodando em http://localhost:${PORT}`));