// public/js/registro.js
document.getElementById('formRegistro').addEventListener('submit', async (e) => {
  e.preventDefault();

  const datos = {
    nickname: document.getElementById('nickname').value,
    correo: document.getElementById('correo').value,
    replica: document.getElementById('replica').value,
    habilidades: document.getElementById('habilidades').value
  };

  try {
    const resp = await fetch('/registro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });

    const resultado = await resp.json();

    if (!resp.ok) {
      alert(`❌ Error: ${resultado.error}`);
    } else {
      alert(`✅ ${resultado.mensaje}`);
      document.getElementById('formRegistro').reset();
    }

  } catch (error) {
    console.error('Error en fetch:', error);
    alert('Error de conexión con el servidor');
  }
});
