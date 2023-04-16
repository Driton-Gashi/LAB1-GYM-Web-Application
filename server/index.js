const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const { createToken, authenticateUser, authMiddleware } = require("./auth");
const User = require("./models/user");

// middleware
app.use(cors());
app.use(express.json());

// ROUTES

// Register a user
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User(name, password, email);
    await user.emailExists({ email });
    await user.save();
    const token = createToken(user);
    res.json({ token });
  } catch (err) {
    console.log(err.message);
  }
});

// Login a user
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authenticateUser(email, password);
    const token = createToken(user);
    res.json({ token });
  } catch (err) {
    console.log(err.message);
  }
});

//create a todo
// app.post("/todos", async (req, res) => {
//   try {
//     const { description } = req.body;
//     const newTodo = await pool.query(
//       "INSERT INTO todo (description) VALUES($1) RETURNING *",
//       [description]
//     );
//     res.json(newTodo.rows[0]);
//   } catch (err) {
//     console.log(err.message);
//   }
// });

// // get all Videos
// app.get("/programs", async (req, res) => {
//   try {
//     const allPrograms = await pool.query("SELECT * from programs");
//     res.json(allPrograms.rows);
//   } catch (error) {
//     console.log(error.message);
//   }
// });

// //get a specific todo
// app.get("/todos/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const todo = await pool.query("SELECT * from todo WHERE todo_id = $1", [
//       id,
//     ]);
//     res.json(todo.rows[0]);
//   } catch (error) {
//     console.log(error.message);
//   }
// });

// //update a todo
// app.put("/todos/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { description } = req.body;
//     const update = await pool.query(
//       "UPDATE todo SET description = $1 where todo_id = $2",
//       [description, id]
//     );
//     res.json("Todo was updated");
//   } catch (error) {
//     console.log(error.message);
//   }
// });
// //delete a todo
// app.delete("/todos/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleteTodo = await pool.query("DELETE from todo WHERE todo_id = $1", [
//       id,
//     ]);
//     res.json("Todo was Deleted");
//   } catch (error) {
//     console.log(error.message);
//   }
// });

app.listen(5000, () => {
  console.log("Server has started on port 5000");
});
