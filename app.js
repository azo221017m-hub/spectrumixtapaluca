// app.js
const express = require('express');
const path = require('path');
const app = express();

const registroRoute = require('./routes/registro');
app.use('/', registroRoute); // O usa '/api' si lo quieres bajo /api/registro



// Middleware para parsear formularios JSON y urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir archivos estáticos desde /public
app.use(express.static(path.join(__dirname, 'public')));

// Ejemplo de ruta de prueba
app.use('/', registroRouter);

module.exports = app;
