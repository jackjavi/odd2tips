const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/User");
const userService = require("../services/userService");
const tokenService = require("../services/tokenService");

exports.register = async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.createUser(email, password);
  const token = tokenService.generateToken({ id: user._id.toString() });
  res.json({ user, token });
};

exports.login = async (request, response) => {
  const { email, password } = request.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.validatePassword(password))) {
      return response.status(401).json({ error: "Unauthorized" });
    }

    const sessionsDir = path.join(__dirname, "..", "sessions");
    if (!fs.existsSync(sessionsDir)) {
      fs.mkdirSync(sessionsDir, { recursive: true });
    }

    const sessionId = uuidv4();

    const sessionPath = path.join(sessionsDir, `${sessionId}.json`);
    const userData = {
      [sessionId]: user._id.toString(),
    };

    fs.writeFileSync(sessionPath, JSON.stringify(userData));

    request.sessionId = sessionId;

    response.status(200).json({ token: sessionId });
  } catch (error) {
    console.error("Login error:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};
