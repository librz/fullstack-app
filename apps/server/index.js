import express from "express";
import pretty from "express-prettify";
import {
  createUser,
  createUsersTable,
  deleteUserById,
  getUserById,
  getUsers,
  updateUserPassword,
} from "./db_actions.js";

const app = express();

app.use(express.json());

app.use(pretty({ query: "pretty" })); // prettify res.json when 'pretty' is present as url query

app.get("/", (req, res, err) => {
  res.type("text");
  res.end("You've reached server");
});

app.post("/create-users-table", (req, res, error) => {
  createUsersTable();
  res.end();
});

// get all users
app.get("/users", (req, res, error) => {
  getUsers((err, users) => {
    if (err) {
      console.error(err);
      res.status(500);
      res.end();
      return;
    }
    res.json(users);
    res.end();
  });
});

// get user by id
app.get("/users/:id", (req, res, error) => {
  const { id } = req.params;
  getUserById(id, (err, user) => {
    if (err) {
      console.error(err);
      res.status(400);
      res.end(`Failed to get user with id ${id}`);
      return;
    }
    if (!user) {
      res.status(400);
      res.end(`Cannot find user with id of ${id}`);
      return;
    }
    res.json(user);
    res.end();
  });
});

// create new user
app.post("/users", (req, res, error) => {
  // content-type header validation
  const contentType = req.headers["content-type"];
  if (!contentType) {
    res.status(400);
    res.end("Missing header: Content-Type");
    return;
  }
  if (!contentType.toLowerCase().includes("application/json")) {
    res.status(400);
    res.end(`Wrong Content-Type: ${contentType}`);
    return;
  }
  const { email, password } = req.body;
  // simple validation
  const missingFields = [];
  if (!email) missingFields.push("email");
  if (!password) missingFields.push("password");
  if (missingFields.length > 0) {
    res.status(400);
    res.end("Fields missing: " + missingFields.join(", "));
    return;
  }
  // insert into db
  createUser(email, password, (error) => {
    if (error) {
      console.error(error);
      res.status(500);
      res.end("Failed to create user"); // most likely an user with the same email already existed
      return;
    }
    res.end();
  });
});

// delete user by id
app.delete("/users/:id", (req, res, error) => {
  const { id } = req.params;
  deleteUserById(id, (err) => {
    if (err) {
      console.error(err);
      res.status(400);
      res.end(`Failed to delete user with id ${id}`);
      return;
    }
    res.end();
  });
});

// update user by id
app.patch("/users/:id", (req, res) => {
  const { id } = req.params;
  console.log("req body", req.body);
  const { password } = req.body;
  if (!password) {
    res.status(400);
    res.end("Missing field: password");
    return;
  }
  updateUserPassword(id, password, (error) => {
    if (error) {
      console.error(error);
      res.status(404);
      res.end(`Cannot find user with id ${id}`);
      return;
    }
    res.end();
  });
});

const PORT = 2048;

app.listen(PORT, () => {
  console.log("app started, listening on port", PORT);
});
