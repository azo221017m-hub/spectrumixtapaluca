const https = require('https');
const fs = require('fs');
const path = require('path');
const app = require('./app');

const PORT = process.env.PORT || 3000;

if (process.env.PORT) {
  // Producción (Render) - sin HTTPS manual
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en producción (Render)`);
  });
} else {
  // Desarrollo local con HTTPS
  const options = {
    key: fs.readFileSync(path.join(__dirname, 'certs', 'privkey.key')),
    cert: fs.readFileSync(path.join(__dirname, 'certs', 'certificado.crt')),
  };

  https.createServer(options, app).listen(PORT, () => {
    console.log(`🔒 Servidor HTTPS corriendo en https://localhost:${PORT}`);
  });
}