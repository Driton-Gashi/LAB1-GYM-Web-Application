const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
const path = require("path");
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
    const user = new User(undefined, name, password, email, "user");

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

//Create a video

app.post("/video", async (req, res) => {
  try {
    const {
      videoName,
      videoDifficulty,
      videoDescription,
      videoURL,
      videoImage,
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

app.get("/getvideo", async (req, res) => {
  try {
    const allVideo = await pool.query("SELECT * from video");
    res.json(allVideo.rows);
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

// Change user Profile
const userProfileFolderPath = path.join(__dirname, "public", "userProfile"); // Path to the "public/userProfile" folder

// Set up multer storage for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, userProfileFolderPath); // Save the file to the "public/userProfile" folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original filename
  },
});

const upload = multer({ storage });

// Endpoint to handle file upload
app.post("/upload", upload.single("image"), (req, res) => {
  res.json({ success: true, message: "File uploaded successfully" });
});

// Start the server
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
