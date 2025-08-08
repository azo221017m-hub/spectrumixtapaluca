const app = require('./app'); // importa el archivo app.js que exporta la app de Express

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
});