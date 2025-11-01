const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.sqlite');

db.serialize(() => {

    db.run(`CREATE TABLE IF NOT EXISTS members (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        phone TEXT
    )`);


    db.run(`CREATE TABLE IF NOT EXISTS trainers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        specialty TEXT
    )`);


    db.all("PRAGMA table_info(trainers)", (err, rows) => {
        if (err) throw err;
        const columnExists = rows.some(row => row.name === 'password');
        if (!columnExists) {
            db.run(`ALTER TABLE trainers ADD COLUMN password TEXT`);
        }
    });


    db.run(`CREATE TABLE IF NOT EXISTS classes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        trainer_id INTEGER,
        schedule TEXT,
        FOREIGN KEY(trainer_id) REFERENCES trainers(id)
    )`);
});

module.exports = db;
