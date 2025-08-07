// index.js

const port = 3000;
const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');


app.use(express.json());


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
