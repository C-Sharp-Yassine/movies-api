import Database from "better-sqlite3";

const db = new Database("movies.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS movies (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  genre TEXT NOT NULL,
  director TEXT NOT NULL,
  year INTEGER NOT NULL

  );
`);

export default db;
