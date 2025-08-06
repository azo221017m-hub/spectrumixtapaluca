const https = require('https');
const fs = require('fs');
const path = require('path');
const app = require('./app'); // Aquí importas el objeto app directamente

const PORT = process.env.PORT || 3000;

const options = {
  key: fs.readFileSync(path.join(__dirname, 'certs', 'privkey.key')),
  cert: fs.readFileSync(path.join(__dirname, 'certs', 'certificado.crt')),
};

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
