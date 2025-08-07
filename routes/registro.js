// routes/registro.js
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { nickname, correo, replica, habilidades } = req.body;
  console.log('📥 Datos recibidos:', req.body);

  if (!nickname || !correo || !replica || !habilidades) {
    console.warn('❗Campos incompletos');
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  const db = req.app.get('db');

  const sql = `INSERT INTO jugadores (nickname, correo, replica, habilidades) VALUES (?, ?, ?, ?)`;
  db.run(sql, [nickname, correo, replica, habilidades], function (err) {
    if (err) {
      console.error('❌ Error al insertar:', err.message);
      return res.status(500).json({ error: 'Error al registrar jugador' });
    }

    console.log('✅ Registro exitoso ID:', this.lastID);
document.getElementById("formulario-registro").reset();
    res.status(200).json({ mensaje: 'Registro exitoso', id: this.lastID });
  });
});

module.exports = router;