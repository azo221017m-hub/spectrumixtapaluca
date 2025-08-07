// index.js
const https = require('https');
const fs = require('fs');
const path = require('path');
const app = require('./app');

// Cargar certificados
const options = {
  key: fs.readFileSync(path.join(__dirname, 'certs', 'privkey.key')),
  cert: fs.readFileSync(path.join(__dirname, 'certs', certificado.crt'))
};

// Puerto seguro
const PORT = process.env.PORT || 4000;

// Crear servidor HTTPS
https.createServer(options, app).listen(PORT, () => {
  console.log(`🔒 Servidor HTTPS corriendo en https://localhost:${PORT}`);
});
