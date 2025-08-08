const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3');
const fs = require('fs');

const app = express();

// Ruta segura para crear DB
const dbPath = path.join(__dirname, 'db', 'database.sqlite');
if (!fs.existsSync(path.dirname(dbPath))) {
  fs.mkdirSync(path.dirname(dbPath));
}

const db = new sqlite3.Database(dbPath);

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Crear tabla si no existe
db.run(`CREATE TABLE IF NOT EXISTS registros (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nickname TEXT,
  correo TEXT,
  replica TEXT,
  habilidades TEXT
)`);

// Ruta para recibir el formulario
app.post('/registro', (req, res) => {
  const { nickname, correo, replica, habilidades } = req.body;

  db.run(
    "INSERT INTO registros (nickname, correo, replica, habilidades) VALUES (?, ?, ?, ?)",
    [nickname, correo, replica, habilidades],
    function (err) {
      if (err) {
        console.error("Error insertando:", err.message);
        return res.status(500).json({ mensaje: "Error al guardar" });
      }
      res.json({ mensaje: "Registro exitoso", id: this.lastID });
    }
  );
});

module.exports = app;
