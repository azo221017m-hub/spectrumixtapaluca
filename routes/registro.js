// routes/registro.js
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { nickname, correo, replica, habilidades } = req.body;
  const db = req.app.get('db');

  // Insertar en la base de datos
  const sql = `INSERT INTO registro(nickname, correo, replica, habilidades) VALUES (?, ?, ?, ?)`;
  db.run(sql, [nickname, correo, replica, habilidades], function (err) {
    if (err) {
      console.error('Error al insertar:', err.message);
      return res.status(500).json({ error: 'Error al registrar jugador' });
    }
    res.status(200).json({ mensaje: 'Registro exitoso', id: this.lastID });
  });
});

module.exports = router;
