// utils/tokenService.js
const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET_KEY || "your_secret_key"; // Ensure you have a secure key in your environment variables

const generateToken = (userData) => {
  // userData should contain the essential information of the user (e.g., id)
  // Adjust token expiration as needed
  return jwt.sign(userData, secretKey, { expiresIn: "1h" });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    console.log(`Token verification failed: ${error.message}`);
    return null; // or you might want to throw an error depending on your error handling strategy
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
