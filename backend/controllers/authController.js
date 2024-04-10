const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/User");
const tokenService = require("../services/tokenService");
const redisClient = require("../utils/redis");
const cloudinary = require("../utils/cloudinaryConfig");

exports.register = async (req, res) => {
  const { email, password, name } = req.body;
  console.log(email, password, name);
  let profilePictureUrl = null;

  try {
    if (req.files) {
      profilePictureUrl = req.files.profilePicture[0].path;
      const result = await cloudinary.uploader.upload(profilePictureUrl);
      profilePictureUrl = result.url;
    }

    const user = new User({
      email,
      password,
      name,
      profilePicture: profilePictureUrl,
    });
    await user.save();

    // const token = tokenService.generateToken({ id: user._id.toString() });
    res.json({ user });
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
      name: user.name,
      profilePicture: user.profilePicture,
    };

    req.user = userData;

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      maxAge: 43200000, // 12 hours (12 * 60 * 60 * 1000 milliseconds)
    });

    res.status(200).json({ message: "Login successful", userData });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.logout = async (req, res) => {
  const token = req.cookies.token;
  try {
    const decoded = tokenService.verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    const sessionId = decoded.sessionId;

    await redisClient.del(sessionId);

    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "none",
    });

    res.status(200).send({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).send({ message: `Internal server error: ${error}` });
  }
};
