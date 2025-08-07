const express = require('express');
const path = require('path');
const registroRouter = require('./routes/registro');
const sqlite3 = require('sqlite3').verbose();
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




const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error al conectar con la base de datos:', err.message);
  } else {
    console.log('📦 Base de datos conectada:', dbPath);
  }
});

app.set('db', db); // MUY IMPORTANTE para que esté disponible en req.app.get('db')