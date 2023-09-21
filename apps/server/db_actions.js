import sqlite3 from "sqlite3";

export function createUsersTable() {
  const db = new sqlite3.Database("./users.db");
  db.serialize(() => {
    db.run(`CREATE TABLE users (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			email TEXT NOT NULL UNIQUE,
			password TEXT NOT NULL
		)`);
  });
  db.close();
}

export function createUser(email, password, callback) {
  const db = new sqlite3.Database("./users.db");
  db.run(`INSERT INTO users (email, password) VALUES ('${email}', '${password}')`, callback);
  db.close();
}

export function getUsers(callback, limit = 2000) {
  const db = new sqlite3.Database("./users.db");
  db.all(`SELECT * FROM users LIMIT ${limit}`, callback);
  db.close();
}

export function getUserById(id, callback) {
  const db = new sqlite3.Database("./users.db");
  db.get(`SELECT * FROM users WHERE id = ${id}`, callback);
  db.close();
}

export function deleteUserById(id, callback) {
  const db = new sqlite3.Database("./users.db");
  db.run(`DELETE FROM users WHERE id = '${id}'`, callback);
  db.close();
}
