const express = require('express');
const router = express.Router();
const db = require('../db/db'); // tu conexión a la base de datos


// Ruta GET para testear que funciona
router.get('/', (req, res) => {
  res.send('Ruta registro funciona');

});

// Ruta POST para insertar un jugador
router.post('/', (req, res) => {
console.log('📥 Datos recibidos:', req.body);  // <-- Aquí el log
  const { nickname, correo, replica, habilidades } = req.body;
  if (!nickname || !correo) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }



  const sql = `INSERT INTO jugadores (nickname, correo, replica, habilidades) VALUES (?, ?, ?, ?)`;
  db.run(sql, [nickname, correo, replica, habilidades], function(err) {
    if (err) {
      console.error('Error al insertar en la base de datos:', err.message);
      return res.status(500).json({ error: 'Error interno en el servidor' });
    }
    res.json({ mensaje: 'Registro exitoso', id: this.lastID });
  });
});

module.exports = router;
