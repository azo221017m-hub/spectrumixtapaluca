// Módulos requeridos

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const https = require('https');

// Instancia de la app
const app = express();
const PORT = 4000;


// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


// Conectar a la base de datos SQLite
const dbPath = path.join(__dirname, 'db', 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error('Error al conectar con la base de datos:', err.message);
  else console.log('📦 Conectado a la base de datos SQLite');
});

// Crear tablas si no existen
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS jugadores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nickname TEXT NOT NULL,
      replica TEXT NOT NULL,
      habilidades TEXT,
      asistencias INTEGER DEFAULT 0,
      medallas TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      correo TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

// === RUTAS API ===

// Obtener jugadores
app.get('/api/jugadores', (req, res) => {
  db.all('SELECT * FROM jugadores', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Registrar nuevo jugador
app.post('/api/jugadores', (req, res) => {
  const { nickname, replica, habilidades } = req.body;
  db.run(
    'INSERT INTO jugadores (nickname, replica, habilidades) VALUES (?, ?, ?)',
    [nickname, replica, habilidades],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

// Registrar nuevo usuario
app.post('/api/registro', (req, res) => {
  const { nombre, correo, password } = req.body;
  db.run(
    'INSERT INTO usuarios (nombre, correo, password) VALUES (?, ?, ?)',
    [nombre, correo, password],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

// Obtener todos los usuarios (opcional, para pruebas)
app.get('/api/usuarios', (req, res) => {
  db.all('SELECT * FROM usuarios', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Certificados SSL para servidor HTTPS
const certOptions = {
  key: fs.readFileSync(path.join(__dirname, 'certs', 'privkey.key')),
  cert: fs.readFileSync(path.join(__dirname, 'certs', 'certificado.crt'))
};



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = app;
