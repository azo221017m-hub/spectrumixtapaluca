document.getElementById('formRegistro').addEventListener('submit', async (e) => {
  e.preventDefault();

  const datos = {
    nickname: document.getElementById('nickname').value,
    correo: document.getElementById('correo').value,
    replica: document.getElementById('replica').value,
    habilidades: document.getElementById('habilidades').value,
  };

  try {
    const respuesta = await fetch('/registro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    });

    if (!respuesta.ok) {
      const text = await respuesta.text();
      throw new Error(`Error HTTP ${respuesta.status}: ${text}`);
    }

    const data = await respuesta.json();
    console.log('Respuesta del servidor:', data);

  } catch (error) {
    console.error('Error en fetch:', error);
  }
});