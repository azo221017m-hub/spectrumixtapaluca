// app.js
const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3');
const fs = require('fs');
const registroRouter = require('./routes/registro');

const app = express();

// 📂 Ruta segura para crear DB
const dbPath = path.join(__dirname, 'db', 'database.sqlite');
if (!fs.existsSync(path.dirname(dbPath))) {
  fs.mkdirSync(path.dirname(dbPath));
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 📂 Carpeta pública
app.use(express.static(path.join(__dirname, 'public')));

// 📦 Conexión a base de datos
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error al conectar con la base de datos:', err.message);
  } else {
    console.log('📦 Base de datos conectada:', dbPath);
  }
});

// 🔗 Rutas
app.use('/registro', registroRouter);

// Página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 📤 Exportar para usar en index.js
module.exports = app;
