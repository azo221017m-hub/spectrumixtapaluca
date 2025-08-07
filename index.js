// index.js
const https = require('https');
const fs = require('fs');
const path = require('path');
const app = require('./app'); // Ya contiene express()

const PORT = process.env.PORT || 4000;

if (process.env.PORT) {
  // En Render (producción)
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
} else {
  // En desarrollo local con HTTPS
  const options = {
    key: fs.readFileSync(path.join(__dirname, 'certs', 'archivo.key')),
    cert: fs.readFileSync(path.join(__dirname, 'certs', 'archivo.crt')),
  };

  https.createServer(options, app).listen(PORT, () => {
    console.log(`🔒 Servidor HTTPS corriendo en https://localhost:${PORT}`);
  });
}
