// index.js
const https = require('https');
const fs = require('fs');
const path = require('path');

// Importa la aplicación Express ya configurada
const app = require('./app'); // Asegúrate de que app.js exporta `express()`

const PORT = process.env.PORT || 3000;

if (process.env.PORT) {
  // En Render (producción): Render ya maneja HTTPS, no uses certificados
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en https://spectrumixtapaluca.onrender.com:${PORT}`);
  });
} else {
  // En desarrollo local con HTTPS (localhost)
  const options = {
    key: fs.readFileSync(path.join(__dirname, 'certs', 'privkey.key')),
    cert: fs.readFileSync(path.join(__dirname, 'certs', 'certificado.crt')),
  };

  https.createServer(options, app).listen(PORT, () => {
    console.log(`🔒 Servidor HTTPS corriendo en https://localhost:${PORT}`);
  });
}
