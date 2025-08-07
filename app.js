const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
// ⚠️ Define primero dbPath
const dbPath = path.join(__dirname, 'database.sqlite'); // ajusta la ruta si está en carpeta
const registroRouter = require('./routes/registro');

// ✅ Luego conecta con la base de datos
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error al conectar con la base de datos:', err.message);
  } else {
    console.log('📦 Base de datos conectada:', dbPath);
  }
});

// Guarda conexión en la app si lo necesitas
app.set('db', db);



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