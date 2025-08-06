// Módulos requeridos
const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Servir archivos estáticos (html, js, css)
app.use(express.static(path.join(__dirname, 'public')));

// Conexión a la base de datos
const db = new sqlite3.Database('./db/database.sqlite', (err) => {
  if (err) {
    console.error('❌ Error al conectar con SQLite:', err.message);
  } else {
    console.log('✅ Conectado a SQLite');
  }
});

// Crear tabla si no existe
db.run(`
  CREATE TABLE IF NOT EXISTS registros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nickname TEXT NOT NULL,
    correo TEXT NOT NULL,
    replica TEXT,
    habilidades TEXT
  )
`);

// Ruta POST para recibir registro
app.post('/registro', (req, res) => {
  const { nickname, correo, replica, habilidades } = req.body;

  const query = `
    INSERT INTO registros (nickname, correo, replica, habilidades)
    VALUES (?, ?, ?, ?)
  `;

  db.run(query, [nickname, correo, replica, habilidades], function(err) {
    if (err) {
      console.error('❌ Error al guardar:', err.message);
      return res.status(500).json({ mensaje: 'Error al registrar' });
    }

    console.log(`✅ Registro insertado con ID: ${this.lastID}`);
    res.status(200).json({ mensaje: 'Registro exitoso' });
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
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
