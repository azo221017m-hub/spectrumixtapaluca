const express = require('express');
const router = express.Router();
const db = require('../db/db'); // Importas la DB aquí para usarla dentro de rutas

router.get('/', (req, res) => {
  res.send('Ruta registro funciona');
});

router.post('/', (req, res) => {
  // lógica de inserción usando db
});

module.exports = router;  // <-- exporta el router, NO la base de datos
