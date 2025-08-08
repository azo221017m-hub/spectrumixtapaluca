const express = require('express');
const app = express();
const path = require('path');

const registroRoutes = require('./routes/registro'); // Importa el router

// Middlewares para leer JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (si tienes carpeta public)
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/registro', registroRoutes);

module.exports = app;

