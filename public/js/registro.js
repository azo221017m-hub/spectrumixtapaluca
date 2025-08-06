document.getElementById('formRegistro').addEventListener('submit', async (e) => {
  e.preventDefault();

  const datos = {
    nickname: document.getElementById('nickname').value,
    correo: document.getElementById('correo').value,
    replica: document.getElementById('replica').value,
    habilidades: document.getElementById('habilidades').value
  };

  try {
    const respuesta = await fetch('/api/registro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });

    const resultado = await respuesta.json();

    if (resultado.success) {
      document.getElementById('mensaje').textContent = '¡Registro exitoso!';
      document.getElementById('formRegistro').reset();
    } else {
      document.getElementById('mensaje').textContent = 'Error: ' + resultado.message;
    }

  } catch (error) {
    document.getElementById('mensaje').textContent = 'Error en el servidor.';
  }
});
