// index.js
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});

db.all("PRAGMA table_info(jugadores);", (err, rows) => {
  if (err) {
    console.error('Error al obtener info tabla jugadores:', err.message);
  } else {
    console.log('Estructura tabla jugadores:', rows);
  }
});
