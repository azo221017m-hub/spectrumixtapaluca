document.getElementById('formRegistro').addEventListener('submit', async (e) => {
  e.preventDefault();

 // Capturando datos del formulario
const datos = {
  nickname: document.getElementById('nickname').value,
  correo: document.getElementById('correo').value,
  replica: document.getElementById('replica').value,
  habilidades: document.getElementById('habilidades').value,
};

// Enviar datos al servidor con fetch POST
fetch('/registro', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(datos)
})
.then(response => {
  if (response.ok) {
    alert('Registro exitoso');
    // Limpiar formulario o redirigir
  } else {
    alert('Error al registrar');
  }
})
.catch(error => console.error('Error:', error));
