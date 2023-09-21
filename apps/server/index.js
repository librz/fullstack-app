import express from "express";
import bodyParser from "body-parser";
import { addUser, createUsersTable, deleteUserById, getUserById, getUsers } from "./db_actions.js";

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res, err) => {
  res.end("You've reached server");
});

app.post("/create-table", (req, res, error) => {
  createUsersTable();
  res.end();
});

app.get("/users/:id", (req, res, error) => {
  const { id } = req.params;
  getUserById(id, (err, user) => {
    if (err) {
      console.error(err);
      const errorMessage = `Failed to get user with id ${id}`;
      res.status(400);
      res.end(errorMessage);
      return;
    }
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify(user));
  });
});

app.post("/users", (req, res, error) => {
  const { username, password } = req.body;
  // simple validation
  if (!username || !password) {
    res.status(400);
    res.end(!username ? "username missing" : "password missing");
    return;
  }
  // insert into db
  addUser(username, password, (error) => {
    if (error) {
      console.error(error);
      res.status(500);
      res.end("Failed to create user");
      return;
    }
    res.end();
  });
});

app.get("/users", (req, res, error) => {
  getUsers((err, users) => {
    if (err) {
      res.status(500);
      res.end();
      return;
    }
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.send(JSON.stringify(users));
    res.end();
  });
});

app.delete("/users/:id", (req, res, error) => {
  const { id } = req.params;
  deleteUserById(id, (err) => {
    if (err) {
      console.error(err);
      const errorMessage = `Failed to delete user with id ${id}`;
      res.status(400);
      res.end(errorMessage);
      return;
    }
    res.end();
  });
});

const PORT = 2048;

app.listen(PORT, () => {
  console.log("app started, listening on port", PORT);
});
