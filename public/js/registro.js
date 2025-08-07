document.getElementById('formRegistro').addEventListener('submit', async (e) => {
  e.preventDefault();

  const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const datos = req.body;
  console.log("Datos recibidos:", datos);
  // Aquí insertar en SQLite o hacer lo necesario
  res.status(200).json({ mensaje: 'Registro recibido' });
});

module.exports = router;

  // Capturando datos del formulario
  const datos = {
    nickname: document.getElementById('nickname').value.trim(),
    correo: document.getElementById('correo').value.trim(),
    replica: document.getElementById('replica').value.trim(),
    habilidades: document.getElementById('habilidades').value.trim(),
  };

  try {
    const response = await fetch('/registro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    });

    if (response.ok) {
      alert('✅ Registro exitoso');
      document.getElementById('formRegistro').reset(); // Limpia el formulario
    } else {
      const mensaje = await response.json();
      alert('❌ Error al registrar: ' + (mensaje.mensaje || 'Error desconocido'));
    }
  } catch (error) {
    console.error('Error al enviar datos:', error);
    alert('❌ Ocurrió un error de conexión con el servidor.');
  }
});
