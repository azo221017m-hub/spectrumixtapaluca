const express = require('express');
const app = express();
const path = require('path');
const registroRoutes = require('./routes/registro');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/', registroRoutes);

app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});
