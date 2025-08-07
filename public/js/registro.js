document.getElementById('formRegistro').addEventListener('submit', async function (e) {
  e.preventDefault();

  const datos = {
    nickname: document.getElementById('nickname').value,
    correo: document.getElementById('correo').value,
    replica: document.getElementById('replica').value,
    habilidades: document.getElementById('habilidades').value
  };




app.post('/registro', (req, res) => {
  const { nickname, correo, replica, habilidades } = req.body;
  const query = `INSERT INTO registros (nickname, correo, replica, habilidades) VALUES (?, ?, ?, ?)`;

  db.run(query, [nickname, correo, replica, habilidades], function (err) {
    if (err) {
      console.error('Error al insertar:', err.message);
      return res.status(500).json({ mensaje: 'Error en el servidor' });
    }

    res.status(200).json({ mensaje: 'Registro recibido' });
  });
});




  try {
    const respuesta = await fetch('https://spectrumixtapaluca.onrender.com/registro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    });

    if (respuesta.ok) {
      const resultado = await respuesta.json();
      alert('Registro exitoso: ' + resultado.mensaje);
    } else {
      alert('Error en el registro');
    }
  } catch (error) {
    console.error('Error al enviar datos:', error);
  }
});

