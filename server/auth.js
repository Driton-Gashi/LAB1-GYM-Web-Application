const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./models/user"); // assuming you have a User model

// Create a JWT token
function createToken(user) {
  return jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: 86400,
  });
}

// Authenticate a user
async function authenticateUser(email, password) {
  const user = await User.findOne({ email });
  1;
  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Incorrect password");
  }

  return user;
}

// Middleware to authenticate requests
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.userId = decoded.id;
    next();
  });
}

module.exports = {
  createToken,
  authenticateUser,
  authMiddleware,
};
