document.getElementById('formRegistro').addEventListener('submit', async function (e) {
  e.preventDefault();

  const datos = {
    nickname: document.getElementById('nickname').value,
    correo: document.getElementById('correo').value,
    replica: document.getElementById('replica').value,
    habilidades: document.getElementById('habilidades').value
  };

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

