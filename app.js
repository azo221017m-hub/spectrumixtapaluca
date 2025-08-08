const https = require('https');
const fs = require('fs');
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


// Configura las opciones con tus certificados
const options = {
  key: fs.readFileSync(path.join(__dirname, 'certs', 'privkey.key')),   // Ajusta ruta si es otro nombre o carpeta
  cert: fs.readFileSync(path.join(__dirname, 'certs', 'certificado.crt'))
};

// Inicia servidor HTTPS
https.createServer(options, app).listen(3443, () => {
  console.log('Servidor HTTPS escuchando en https://localhost:3443');
});

module.exports = app;