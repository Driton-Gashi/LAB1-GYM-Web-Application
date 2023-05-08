const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const { createToken, authenticateUser, authMiddleware } = require("./auth");
const User = require("./models/user");
const authentication = require("./authorization");

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

// Adding product to database
app.post("/cart/add", async (req, res) => {
  const { productId, productName, price, quantity } = req.body;

  try {
    // Get the cart ID associated with the user's session
    const {
      rows: [cart],
    } = await pool.query("SELECT id FROM cart WHERE session_id = $1", [
      req.session.id,
    ]);

    // Check if the product is already in the cart
    const {
      rows: [existingItem],
    } = await pool.query(
      "SELECT * FROM cartItem WHERE cart_id = $1 AND product_name = $2",
      [cart.id, productName]
    );

    if (existingItem) {
      // If the product is already in the cart, increase the quantity
      const newQuantity = existingItem.quantity + quantity;

      await pool.query("UPDATE cartItem SET quantity = $1 WHERE id = $2", [
        newQuantity,
        existingItem.id,
      ]);
    } else {
      // If the product is not in the cart, add it as a new row
      await pool.query(
        "INSERT INTO cartItem (cart_id, product_name, price, quantity) VALUES ($1, $2, $3, $4)",
        [cart.id, productName, price, quantity]
      );
    }

    res.status(200).send("Product added to cart successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding product to cart.");
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
