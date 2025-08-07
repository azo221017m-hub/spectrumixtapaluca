// index.js

const port = 3000;
const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));

app.use(express.json());

app.post('/registro', (req, res) => {
  const { nickname, correo, replica, habilidades } = req.body;
  const query = `INSERT INTO registros (nickname, correo, replica, habilidades) VALUES (?, ?, ?, ?)`;

  db.run(query, [nickname, correo, replica, habilidades], function (err) {
    if (err) {
      console.error('Error al insertar:', err.message);
      return res.status(500).json({ mensaje: 'Error en el servidor' });
    }

    res.status(200).json({ mensaje: 'Registro recibido' });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});



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




// Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});
