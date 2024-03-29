const express = require("express");
const app = express();
const cors = require("cors");
// const multer = require("multer");
// const path = require("path");
const pool = require("./db");
const { createToken } = require("./auth");
const User = require("./models/user");
const authentication = require("./authorization");
const jwt = require("jsonwebtoken");
// const { log } = require("console");
// require("dotenv").config();
// middleware
app.use(cors());
app.use(express.json());

// Register a user create
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User(undefined, name, password, email, "user", "userProfile/defaultProfile.png");

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

// Register a new user in Admin Dashboard
app.post("/registernewuser", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = new User(undefined, name, password, email, role, "userProfile/defaultProfile.png");

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


// get all items
app.get("/items", async (req, res) => {
  try {
    const orderBy = req.query.orderBy;
    const category = req.query.category;
    let allItems = await pool.query("SELECT * from items");
    if (orderBy !== null && orderBy != undefined) {
      allItems = await pool.query(
        `SELECT * from items order by ${orderBy} desc`
      );
    } else if (category !== null && category != undefined) {
      allItems = await pool.query(
        `SELECT * from items where item_category = '${category}'`
      );
    }
    res.json(allItems.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// Items Published by a specific publisher
app.get("/itemsby/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let allItems = await pool.query("SELECT * from items where publisher_id = $1",[id]);
   
    res.json(allItems.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// create Items
app.post("/createitem", async (req, res) => {
  try {
    const {
      productName,
      productDescription,
      productPrice,
      productReview,
      productImage,
      productCategory,
      publisherId,
    } = req.body;

    const query = {
      text: "INSERT INTO items (item_name, item_description, item_price, item_review,item_image,item_category, publisher_id) VALUES ($1, $2, $3, $4,$5,$6,$7)",
      values: [
        productName,
        productDescription,
        productPrice,
        productReview,
        productImage,
        productCategory,
        publisherId,
      ],
    };
    const { rows } = await pool.query(query.text, query.values);
   
    res.json({ message: "Product was added successfuly" });
  } catch (err) {
    console.log(err.message);
  }
});

  // Delete a specific item by item_id
  app.delete('/deleteitem/:item_id', async (req, res) => {
    const { item_id } = req.params;
  
    try {
        // Delete the item from the PostgreSQL table
        const deleteQuery = 'DELETE FROM items WHERE item_id = $1';
        const values = [item_id];
  
        const result = await pool.query(deleteQuery, values);
  
        res.json("deleted successfully");
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ error: 'Internal server error' });
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

// Get User by ID
app.get("/getuser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    let user = await pool.query(
      "SELECT * from users where user_id = $1",
      [id]
    );
    res.json(user.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// Get User by Username
app.get("/getuserbyusername/:username", async (req, res) => {
  try {
    const { username } = req.params;

    let users = await pool.query(
      "SELECT * FROM users WHERE user_name LIKE $1 ORDER BY SIMILARITY(user_name, $2) DESC",
      [`%${username}%`, username]
    );
    res.json(users.rows);
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

app.get("/getvideo", async (req, res) => {
  try {
    const allVideo = await pool.query("SELECT * from video");
    res.json(allVideo.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/getcategories", async (req, res) => {
  try {
    const allCategories = await pool.query("SELECT * from categories");
    res.json(allCategories.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
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

//update a User if you are editing his Username, Email and role
app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, role } = req.body;

    const emailExist = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (emailExist.rows.length > 0) {
      // Return an error response if the user already exists
      response = res.status(400).json({
        message: "User with this email already exists, try another email!",
      });
    } else {
      const update = await pool.query(
        "UPDATE users SET user_name = $1, email = $2, role = $3 WHERE user_id = $4",
        [username, email, role, id]
      );
      response = res.json({ message: "User was updated" });
    }
    return response;
  } catch (error) {
    console.log(error.message);
    // res.status(500).json("An error occurred while updating the user");
  }
});

app.put("/adminedituser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { username, role, address, tel, city, image } = req.body;

      const update = await pool.query(
        "UPDATE users SET user_name = $1, role = $2, address = $3, tel_number = $4, city = $5, image = $6 WHERE user_id = $7",
        [username, role, address, tel, city, image, id]
      );
      response = res.json({ message: "User was updated" });
    
    return response;
  } catch (error) {
    console.log(error.message);
    // res.status(500).json("An error occurred while updating the user");
  }
});

app.put("/userswithoutemail/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { username, role } = req.body;

    const update = await pool.query(
      "UPDATE users SET user_name = $1, role = $2 WHERE user_id = $3",
      [username, role, id]
    );
    response = res.json({ message: "User was updated" });

    return response;
  } catch (error) {
    console.log(error.message);
    response = res.status(400).json({
      message: "An error ocurred while updating the user",
    });

    // res.status(500).json("An error occurred while updating the user");
  }
});

//update a user at profile
app.put("/userProfile/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, address, tel, city } = req.body;
    const emailExist = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    let response;

    if (emailExist.rows.length > 0) {
      // Return an error response if the user already exists
      response = res.status(400).json({
        message: "User with this email already exists, try another email!",
      });
    } else {
      const update = await pool.query(
        "UPDATE users SET user_name = $1, email = $2, address = $3, tel_number = $4, city = $5 WHERE user_id = $6",
        [username, email, address, tel, city, id]
      );
      response = res.json({ message: "User was updated" });
    }
    return response;
  } catch (error) {
    console.log(error.message);
    // res.status(500).json("An error occurred while updating the user");
  }
});
// Update user profile without email
app.put("/userProfileEmail/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { username, address, tel, city } = req.body;

    let response;

    const update = await pool.query(
      "UPDATE users SET user_name = $1, address = $2, tel_number = $3, city = $4 WHERE user_id = $5",
      [username, address, tel, city, id]
    );
    response = res.json({ message: "User was updated" });

    return response;
  } catch (error) {
    console.log(error.message);
    // res.status(500).json("An error occurred while updating the user");
  }
});


// Get Cart Items in the cart

app.get("/cartitems/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let allItems = await pool.query("SELECT items.* FROM items INNER JOIN shopping_cart ON items.item_id = shopping_cart.product_id WHERE shopping_cart.user_id = $1",[id]);
    res.json(allItems.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// get Cart price
app.get("/gettotal/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let totalPrice = await pool.query("SELECT SUM(items.item_price) AS total_price FROM items INNER JOIN shopping_cart ON items.item_id = shopping_cart.product_id WHERE shopping_cart.user_id = $1",[id]);
    res.json(totalPrice.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// Add product to Cart
app.post("/addtocart/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { product_id, price } = req.body;

    // Check if the product with the same product_id already exists in the cart for this user
    const existingCartItem = await pool.query(
      "SELECT * FROM shopping_cart WHERE user_id = $1 AND product_id = $2",
      [id, product_id]
    );

    if (existingCartItem.rows.length > 0) {
      // Product with the same ID already exists in the cart, you can choose to update its quantity or handle it as needed.
      res.status(409).json("This product is already in your cart!");
    } else {
      // Product with the same ID does not exist in the cart, proceed to add it.
      const query = {
        text:
          "INSERT INTO shopping_cart (user_id, product_id, price) VALUES($1, $2, $3) RETURNING product_id",
        values: [id, product_id, price],
      };

      const { rows } = await pool.query(query.text, query.values);
      res.json("Product was added to cart successfully");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Internal Server Error");
  }
});

// Remove a Product from Cart
app.delete("/removefromcart/:userId/:productId", async (req, res) => {
  try {
    const { productId,userId } = req.params;
    const deleteUser = await pool.query(
      " delete from shopping_cart where user_id = $1 AND product_id = $2;",
      [userId, productId]
    );
    res.json("User was deleted");
  } catch (error) {
    console.log(error.message);
  }
});

// Start the server
app.listen(5000, () => {
  console.log("Server has started on port 5000");
});

// Endpoints per mbrojtjen e projektit
// create club
app.post('/createclub', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Club name is required' });
  }

  try {
    // Insert the new club into the PostgreSQL table
    const insertQuery = 'INSERT INTO club (name) VALUES ($1) RETURNING *';
    const values = [name];

    const result = await pool.query(insertQuery, values);

    // Send a response with the newly created club
    const newClub = result.rows[0];
    res.json(newClub);
  } catch (error) {
    console.error('Error creating club:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all clubs
app.get('/getclubs', async (req, res) => {
  try {
    // Retrieve all clubs from the PostgreSQL table
    const query = 'SELECT * FROM club';
    const result = await pool.query(query);

    // Send the retrieved clubs as JSON
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching clubs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/editclub/:club_id', async (req, res) => {
  const { club_id } = req.params;
  const { name } = req.body;

  try {
      // Update the club information in the PostgreSQL table
      const updateQuery = 'UPDATE club SET name = $1 WHERE id = $2';
      const values = [name, club_id];

      const result = await pool.query(updateQuery, values);

      if (result.rowCount === 1) {
          res.status(200).json({ message: 'Club information updated successfully' });
      } else {
          res.status(404).json({ error: 'Club not found' });
      }
  } catch (error) {
      console.error('Error editing club:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete club by club ID
app.delete('/deleteclub/:club_id', async (req, res) => {
  const { club_id } = req.params;

  try {
      // Delete the club from the PostgreSQL table
      const deleteQuery = 'DELETE FROM club WHERE id = $1';
      const values = [club_id];

      const result = await pool.query(deleteQuery, values);

      if (result.rowCount === 1) {
          res.json({ message: 'Club deleted successfully' });
      } else {
          res.status(404).json({ error: 'Club not found' });
      }
  } catch (error) {
      console.error('Error deleting club:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a player
app.post('/createplayer', async (req, res) => {
  const { name, club_id } = req.body;

  if (!name || !club_id) {
      return res.status(400).json({ error: 'Name and club_id are required' });
  }

  try {
      // Insert the new player into the PostgreSQL table
      const insertQuery = 'INSERT INTO player (name, club_id) VALUES ($1, $2) RETURNING *';
      const values = [name, club_id];

      const result = await pool.query(insertQuery, values);

      // Send a response with the newly created player
      const newPlayer = result.rows[0];
      res.json(newPlayer);
  } catch (error) {
      console.error('Error creating player:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/getplayers', async (req, res) => {
  try {
      // Retrieve all players from the PostgreSQL table
      const query = 'SELECT * FROM player';
      const result = await pool.query(query);

      // Send the retrieved players as JSON
      res.json(result.rows);
  } catch (error) {
      console.error('Error fetching players:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete player by player ID
app.delete('/deleteplayer/:player_id', async (req, res) => {
  const { player_id } = req.params;

  try {
      // Delete the club from the PostgreSQL table
      const deleteQuery = 'DELETE FROM player WHERE id = $1';
      const values = [player_id];

      const result = await pool.query(deleteQuery, values);

      if (result.rowCount === 1) {
          res.json({ message: 'Club deleted successfully' });
      } else {
          res.status(404).json({ error: 'Club not found' });
      }
  } catch (error) {
      console.error('Error deleting club:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

// Edit player information by player ID
app.put('/editplayer/:player_id', async (req, res) => {
  const { player_id } = req.params;
  const { name, clubId } = req.body;

  try {
      // Update the player information in the PostgreSQL table
      const updateQuery = 'UPDATE player SET name = $1, club_id = $2 WHERE id = $3';
      const values = [name, clubId, player_id];

      const result = await pool.query(updateQuery, values);

      if (result.rowCount === 1) {
          res.status(200).json({ message: 'Player information updated successfully' });
      } else {
          res.status(404).json({ error: 'Player not found' });
      }
  } catch (error) {
      console.error('Error editing player:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

//  -------------------------------------------------------------------------------
// Endpoints that are not being used
//Create a video

app.post("/video", async (req, res) => {
  try {
    const {
      videoName,
      videoDifficulty,
      videoDescription,
      videoImage,
      videoURL,
      videoCategory,
    } = req.body;
    const query = {
      text: "INSERT INTO video (video_name, video_difficulity, vide_description, vide_url, vide_image, video_category) VALUES($1, $2, $3, $4, $5, $6) RETURNING video_id",
      values: [
        videoName,
        videoDifficulty,
        videoDescription,
        videoURL,
        videoImage,
        videoCategory,
      ],
    };
    const { rows } = await pool.query(query.text, query.values);
    const videoId = rows[0].video_id;
    res.json({ message: "video added succesfully" });
  } catch (err) {
    console.log(err.message);
  }
});
//DeleteVideo
app.delete("/videoDelete/:video_id", async (req, res) => {
  try {
    const { video_id } = req.params;
    const deleteVideo = await pool.query(
      "DELETE from video WHERE video_id = $1",
      [video_id]
    );
    res.json("User was deleted");
  } catch (error) {
    console.log(error.message);
  }
});


//Update video
app.put("/video/:video_id", async (req, res) => {
  try {
    const { video_id } = req.params;
    const { video_name,
            video_difficulity,
            vide_description,
            vide_url,
            vide_image,
            video_category} = req.body;
      const update = await pool.query(
        "UPDATE video SET video_name = $1, video_difficulity = $2, vide_description = $3, vide_url = $4, vide_image = $5, video_category = $6 WHERE video_id = $7",
        [video_name, video_difficulity, vide_description, vide_url, vide_image, video_category, video_id]
      );
      response = res.json({ message: "video was updated" });
    return response;
  } catch (error) {
    console.log(error.message);
  }
});

//DeleteVideo
app.delete("/videoDelete/:video_id", async (req, res) => {
  try {
    const { video_id } = req.params;
    const deleteVideo = await pool.query(
      "DELETE from video WHERE video_id = $1",
      [video_id]
    );
    res.json("User was deleted");
  } catch (error) {
    console.log(error.message);
  }
});

//create watched video
app.post("/createVideo_user", async (req, res) => {
  try {
    const {
      videoId,
      userId
    } = req.body;
    const query = {
      text: "INSERT INTO video_user (v_id,u_id,watched) VALUES($1, $2, 1)",
      values: [
        videoId,
        userId
      ],
    };
    await pool.query(query);
    res.json({ message: "video_user added succesfully" });
  } catch (err) {
    console.log(err.message);
  }
});


//get watched video
app.get("/video_user/:video_id/:user_id" , async(req,res) => {
try{
  const {user_id,video_id} = req.params;
  const watched = await pool.query(`SELECT watched from video_user where u_id = ${user_id} and v_id = ${video_id}`);
  res.json(watched.rows[0]);
}catch(error) {
  console.log(error.message);
}
})

// // get all Videos
// app.get("/programs", async (req, res) => {
//   try {
//     const allPrograms = await pool.query("SELECT * from programs");
//     res.json(allPrograms.rows);
//   } catch (error) {
//     console.log(error.message);
//   }
// });
