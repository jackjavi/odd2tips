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
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return response.status(401).json({ error: "Unauthorized" });
    }

    // Generate a unique session ID
    const sessionId = uuidv4();
    // Generate JWT that includes both userId and sessionId
    const token = tokenService.generateToken({
      userId: user._id.toString(),
      sessionId,
    });

    // Prepare the sessions directory
    const sessionsDir = path.join(__dirname, "..", "sessions");
    if (!fs.existsSync(sessionsDir)) {
      fs.mkdirSync(sessionsDir, { recursive: true });
    }

    // Create a session file named after the sessionId
    const sessionPath = path.join(sessionsDir, `${sessionId}.json`);
    // Store the user ID in the session file
    fs.writeFileSync(
      sessionPath,
      JSON.stringify({ userId: user._id.toString() })
    );

    response.status(200).json({ token });
  } catch (error) {
    console.error("Login error:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};
