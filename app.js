// app.js
const express = require('express');
const app = express();
const path = require('path');

// Middlewares para leer JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (si tienes carpeta public)
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
const registroRoutes = require('./routes/registro');
app.use('/', registroRoutes);

module.exports = app;
