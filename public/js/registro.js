document.getElementById('formRegistro').addEventListener('submit', async (e) => {
  e.preventDefault();

  const datos = {
    nickname: document.getElementById('nickname').value.trim(),
    correo: document.getElementById('correo').value.trim(),
    replica: document.getElementById('replica').value.trim(),
    habilidades: document.getElementById('habilidades').value.trim()
  };

  try {
    const response = await fetch('/registro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)  // Usar los datos del formulario, no valores fijos
    });

    if (!response.ok) {
      const errorData = await response.json();
      mostrarMensaje('Error: ' + (errorData.error || 'Error en el servidor'), true);
      return;
    }

    const data = await response.json();
    mostrarMensaje(data.mensaje || 'Registro exitoso', false);
    e.target.reset(); // Limpia el formulario

  } catch (error) {
    mostrarMensaje('Error en la conexión: ' + error.message, true);
  }
});

function mostrarMensaje(msg, esError) {
  const div = document.getElementById('mensaje');
  div.textContent = msg;
  div.style.color = esError ? 'red' : 'green';
}
