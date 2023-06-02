const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const { createToken } = require("./auth");
const User = require("./models/user");
const authentication = require("./authorization");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// middleware
app.use(cors());
app.use(express.json());

// Register a user
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User(name, password, email, "user");
    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    let response;
    if (userExists.rows.length > 0) {
      // Return an error response if the user already exists
      response = res.status(400).json({
        message: "User with this email already exists, try another email!",
      });
    } else {
      await user.save();
      const token = createToken(user);
      response = res.json({ token });
    }

    return response;
  } catch (err) {
    console.log(err.message);
  }
});

// Login a user
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const lowerCaseEmail = email.toLowerCase();

    // Find the user by email in the database
    const user = await User.findOne({ email: lowerCaseEmail });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if the provided password matches the user's password
    const isPasswordValid = await user.checkPassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Create and sign the JWT token
    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Return the token to the client
    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const userExists = await pool.query(
//       "SELECT * FROM users WHERE email = $1",
//       [email]
//     );
//     if (userExists.rows.length > 0) {
//       const user = userExists.rows[0];
//       const isPasswordValid = await authenticateUser(password, user.password);

//       if (isPasswordValid) {
//         const token = jwt.sign(
//           { user: { id: user.id } },
//           process.env.JWT_SECRET,
//           {
//             expiresIn: "1h",
//           }
//         );

//         res.json({ token });
//       } else {
//         res.status(401).json({ message: "Invalid email or password" });
//       }
//     } else {
//       res.status(404).json({ message: "User doesn't exist" });
//     }
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).json({ message: "Server Error" });
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

// get all items
app.get("/items", async (req, res) => {
  try {
    const orderBy = req.query.orderBy;
    let allItems = await pool.query("SELECT * from items");
    if (orderBy !== null && orderBy != undefined) {
      allItems = await pool.query(
        `SELECT * from items order by ${orderBy} desc`
      );
    }
    res.json(allItems.rows);
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/users", async (req, res) => {
  try {
    const orderBy = req.query.orderBy;
    let allUsers = await pool.query("SELECT * from users");
    if (orderBy !== null && orderBy != undefined) {
      allUsers = await pool.query(
        `SELECT * from users order by ${orderBy} desc`
      );
    }
    res.json(allUsers.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// verify is json web token is not fake
app.get("/verify", authentication, async (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

//test nga henori
app.get("/video", async (req, res) => {
  try {
    const newDescription = await pool.query("select * from video");
    res.json(newDescription);
  } catch (error) {
    console.log(error.message);
  }
});
//delete a user at Dashboard
app.delete("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await pool.query(
      "DELETE from users WHERE user_id = $1",
      [id]
    );
    res.json("User was deleted");
  } catch (error) {
    console.log(error.message);
  }
});
app.listen(5000, () => {
  console.log("Server has started on port 5000");
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
