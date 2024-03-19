const { verifyToken } = require("../services/tokenService");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Assuming the token is sent in the Authorization header as "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  req.user = decoded; // Add the decoded user data to the request object
  next();
};
