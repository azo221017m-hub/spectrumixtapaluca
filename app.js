// app.js
const express = require('express');
const path = require('path');
const app = express();

// Middleware para parsear formularios JSON y urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir archivos estáticos desde /public
app.use(express.static(path.join(__dirname, 'public')));

// Ejemplo de ruta de prueba
app.get('/registro', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'registro.html'));
});

module.exports = app;
