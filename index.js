const express = require('express');
const app = express(); // AQUÍ se instancia correctamente Express
const registroRouter = require('./routes/registro');  // Ajusta la ruta según tu estructura

const path = require('path');

app.use(express.json());
app.use('/registro', registroRouter);

// Tu configuración aquí (middleware, rutas, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Ruta base
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Escuchar puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});
