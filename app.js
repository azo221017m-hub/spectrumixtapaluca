// app.js
const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;


// Servir archivos estáticos (html, js, css) desde carpeta 'public'
app.use(express.static('public'));


// Conexión a la base de datos SQLite
const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'), (err) => {
  if (err) {
    console.error('❌ Error al conectar con SQLite:', err.message);
  } else {
    console.log('✅ Conectado a SQLite');
  }
});

// Crear tabla 'registros' si no existe
db.run(`
  CREATE TABLE IF NOT EXISTS registros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nickname TEXT NOT NULL,
    correo TEXT NOT NULL,
    replica TEXT,
    habilidades TEXT
  )
`);

// Ruta POST para recibir datos del formulario y guardar en la base de datos
app.post('/registro', (req, res) => {
  const { nickname, correo, replica, habilidades } = req.body;

  const query = `
    INSERT INTO registros (nickname, correo, replica, habilidades)
    VALUES (?, ?, ?, ?)
  `;

  db.run(query, [nickname, correo, replica, habilidades], function(err) {
    if (err) {
      console.error('Error al insertar:', err);
      return res.status(500).json({ mensaje: 'Error al registrar' });
    }
    res.status(200).json({ mensaje: 'Registro exitoso', id: this.lastID });
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});
