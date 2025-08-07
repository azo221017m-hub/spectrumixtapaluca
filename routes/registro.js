const express = require('express');
const router = express.Router();

router.post('/registro', (req, res) => {
  const datos = req.body;
  console.log('Datos recibidos:', datos);
  res.json({ mensaje: 'Registro exitoso' });
});

module.exports = router;
