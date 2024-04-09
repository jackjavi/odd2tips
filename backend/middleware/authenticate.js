const { verifyToken } = require("../services/tokenService");

const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  console.log("Token:", token);

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  console.log("Token:", token);
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  req.user = decoded;
  next();
};

module.exports = authenticate;
