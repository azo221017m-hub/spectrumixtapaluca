const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /routes/registro
router.post('/', (req, res) => {
  const { nombre, correo, password } = req.body;

// Ruta para obtener todos los usuarios registrados
router.get('/', (req, res) => {
  const query = 'SELECT * FROM usuarios';

  db.all(query, [], (err, filas) => {
    if (err) {
      console.error('Error al obtener usuarios:', err.message);
      return res.status(500).json({ mensaje: 'Error al consultar usuarios' });
    }
    res.json(filas);
  });
});

db.run(query, [nombre, correo, password], function(err) {
  if (err) {
    console.error('Error al registrar usuario:', err.message);
    return res.status(500).json({ mensaje: 'Error en el servidor', error: err.message });
  }
  console.log('Usuario registrado con id:', this.lastID);
  res.status(201).json({ mensaje: 'Usuario registrado correctamente', id: this.lastID });
});


module.exports = router;
