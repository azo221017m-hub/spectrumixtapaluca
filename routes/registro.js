const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');
console.log('Ruta de la base de datos SQLite:', dbPath);

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error al conectar con la base de datos:', err.message);
  } else {
    console.log('✅ Conectado a la base de datos SQLite.');
  }
});

// Crear tabla si no existe
const createTableSql = `
CREATE TABLE IF NOT EXISTS jugadores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nickname TEXT NOT NULL,
  correo TEXT NOT NULL,
  replica TEXT,
  habilidades TEXT
);`;

db.run(createTableSql, (err) => {
  if (err) {
    console.error('❌ Error al crear tabla jugadores:', err.message);
  } else {
    console.log('✅ Tabla jugadores lista.');
  }
});

module.exports = db;

