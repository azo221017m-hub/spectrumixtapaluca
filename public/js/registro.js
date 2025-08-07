
document.getElementById('formRegistro').addEventListener('submit', async (e) => {
  e.preventDefault();

  const datos = {
    nickname: document.getElementById('nickname').value,
    correo: document.getElementById('correo').value,
    replica: document.getElementById('replica').value,
    habilidades: document.getElementById('habilidades').value,
  };

  try {
    const respuesta = await fetch('https://spectrumixtapaluca.onrender.com/registro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    });

    const resultado = await respuesta.json();
    alert(resultado.mensaje);
  } catch (error) {
    console.error('Error:', error);
  }
});
