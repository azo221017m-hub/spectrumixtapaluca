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




// Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});
