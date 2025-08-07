// routes/registro.js
const express = require('express');
const router = express.Router();
const path = require('path');

router.post('/', (req, res) => {
  const db = req.app.get('db');
  const { nickname, correo, replica, habilidades } = req.body;

  const sql = `INSERT INTO jugadores (nickname, correo, replica, habilidades) VALUES (?, ?, ?, ?)`;
  db.run(sql, [nickname, correo, replica, habilidades], function (err) {
    if (err) {
      console.error('❌ Error al insertar en la base de datos:', err.message);
      return res.status(500).send('Error al registrar');
    }
    console.log(`✅ Jugador registrado con ID ${this.lastID}`);
    res.status(200).send('Registro exitoso');
  });
});

module.exports = router;
