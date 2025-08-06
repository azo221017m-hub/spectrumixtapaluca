const https = require('https');
const fs = require('fs');
const path = require('path');
const app = require('./app'); // Aquí importas el objeto app directamente

const PORT = process.env.PORT || 4000;

const options = {
  key: fs.readFileSync(path.join(__dirname, 'certs', 'privkey.key')),
  cert: fs.readFileSync(path.join(__dirname, 'certs', 'certificado.crt')),
};

https.createServer(options, app).listen(PORT, () => {
  console.log(`Servidor HTTPS corriendo en https://spectrumixtapaluca.local:${PORT}`);
});
