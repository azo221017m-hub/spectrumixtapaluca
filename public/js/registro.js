// public/js/registro.js
document.getElementById('formRegistro').addEventListener('submit', async (e) => {
  e.preventDefault();

  const datos = {
    nickname: document.getElementById('nickname').value,
    correo: document.getElementById('correo').value,
    replica: document.getElementById('replica').value,
    habilidades: document.getElementById('habilidades').value
  };


  fetch('/registro', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    nickname: 'usuario1',
    correo: 'correo@ejemplo.com',
    replica: 'm4',
    habilidades: 'CQB'
  })
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));