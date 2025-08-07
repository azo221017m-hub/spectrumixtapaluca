
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
})
  .then(async (response) => {
    if (!response.ok) {
      // Intentar leer el texto para diagnosticar
      const text = await response.text();
      throw new Error(`Error HTTP ${response.status}: ${text}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log('Respuesta del servidor:', data);
  })
  .catch((error) => {
    console.error('Error en fetch:', error);
  });



