const https = require('https');
const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');


const cors = require('cors');

// Habilita CORS para todas las rutas
app.use(cors());


const registroRoutes = require('./routes/registro'); // Importa el router

// Middlewares para leer JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (si tienes carpeta public)
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/registro', registroRoutes);


// Configura las opciones con tus certificados
const options = {
  key: fs.readFileSync(path.join(__dirname, 'certs', 'privkey.key')),   // Ajusta ruta si es otro nombre o carpeta
  cert: fs.readFileSync(path.join(__dirname, 'certs', 'certificado.crt'))
};

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});




module.exports = app;