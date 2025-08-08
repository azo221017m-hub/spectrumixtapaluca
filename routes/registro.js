// routes/registro.js
const express = require('express');
const router = express.Router();
const db = require('../db/db'); // Ajusta la ruta si está en otra carpeta

// En routes/registro.js
router.get('/', (req, res) => {
  res.send('Ruta registro funciona, usa POST para enviar datos.');
});


router.post('/', async (req, res)  => {
  try {
    const { nickname, correo, replica, habilidades } = req.body;
 console.log('📥 Datos recibidos:', req.body);  // <-- Aquí el log

    if (!nickname || !correo) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }



    const sql = `INSERT INTO jugadores (nickname, correo, replica, habilidades)
                 VALUES (?, ?, ?, ?)`;

    db.run(sql, [nickname, correo, replica, habilidades], function(err) {
      if (err) {
        console.error('❌ Error al insertar en la base de datos:', err.message);
        return res.status(500).json({ error: 'Error interno en el servidor' });
      }
      res.json({ mensaje: '✅ Registro exitoso', id: this.lastID });
    });

  } catch (error) {
    console.error('❌ Error general en /registro:', error);
    res.status(500).json({ error: 'Error inesperado en el servidor' });
  }
});

module.exports = router;
