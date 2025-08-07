const express = require('express');
const path = require('path');
const registroRouter = require('./routes/registro');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

// Aquí se monta la ruta para /registro
app.use('/registro', registroRouter);

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

module.exports = app;
