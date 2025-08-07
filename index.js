// index.js
const https = require('https');
const fs = require('fs');
const path = require('path');
const app = require('./app');

// Cargar certificados
const options = {
  key: fs.readFileSync(path.join(__dirname, 'certs', 'privkey.key')),
  cert: fs.readFileSync(path.join(__dirname, 'certs', 'certificado.crt'))
};


const express = require('express');

// Usa el puerto proporcionado por el entorno, o 3000 por defecto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});



// Crear servidor HTTPS
https.createServer(options, app).listen(PORT, () => {
  console.log(`🔒 Servidor HTTPS corriendo en https://localhost:${PORT}`);
});
