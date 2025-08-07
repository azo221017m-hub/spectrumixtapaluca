const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  console.log('Datos recibidos:', req.body);
  res.json({ mensaje: 'Registro recibido' });
});

module.exports = router;
