
// app.js
const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

// Inicializa la app
const app = express();

// Middleware para analizar JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas estáticas
app.use(express.static(path.join(__dirname, 'public')));
//app.use('/js', express.static(path.join(__dirname, 'public/js')));
//app.use('/css', express.static(path.join(__dirname, 'public/css')));
//app.use('/img', express.static(path.join(__dirname, 'public/img')));

// Conexión a SQLite
const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error al conectar con la base de datos:', err.message);
  } else {
    console.log('📦 Base de datos conectada:', dbPath);
  }
});
app.set('db', db);

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Rutas personalizadas
const registroRoutes = require('./routes/registro');
app.use('/registro', registroRoutes);

module.exports = app;
