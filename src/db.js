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

    db.run(`CREATE TABLE IF NOT EXISTS classes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    trainer_id INTEGER,
    schedule TEXT,
    FOREIGN KEY(trainer_id) REFERENCES trainers(id)
  )`);

});

module.exports = db;