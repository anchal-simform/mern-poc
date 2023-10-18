// auth.js
const jwt = require("jsonwebtoken");

const secretKey = "your-secret-key";

const generateToken = (user) => {
  return jwt.sign({ userId: user._id }, secretKey, { expiresIn: "24h" });
};

const verifyToken = (token) => {
  return jwt.verify(token, secretKey);
};

module.exports = { generateToken, verifyToken };
