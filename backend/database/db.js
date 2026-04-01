const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./products.db', (err) => {
    if (err) {
        console.error('Erro ao conectar:', err.message);
    } else {
        console.log('Conectado ao SQLite');
    }
});


db.run(`
    CREATE TABLE IF NOT EXISTS produtos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        preco REAL NOT NULL,
        quantidade INTEGER NOT NULL
    )
`);

module.exports = db;