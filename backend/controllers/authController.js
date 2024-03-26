const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/User");
const userService = require("../services/userService");
const tokenService = require("../services/tokenService");
const redisClient = require("../utils/redis");

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.createUser(email, password);
    const token = tokenService.generateToken({ id: user._id.toString() });
    res.json({ user, token });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const sessionId = uuidv4();
    const token = tokenService.generateToken({
      userId: user._id.toString(),
      sessionId,
    });

    await redisClient.set(
      sessionId,
      JSON.stringify({ userId: user._id.toString() }),
      86400
    );

    const userData = {
      email: user.email,
      id: user._id.toString(),
    };

    res.status(200).json({ token, userData });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.logout = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = tokenService.verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    const sessionId = decoded.sessionId;

    await redisClient.del(sessionId);

    res.status(200).send({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).send({ message: `Internal server error: ${error}` });
  }
};
