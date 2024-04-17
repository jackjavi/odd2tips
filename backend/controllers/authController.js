const bcrypt = require("bcrypt");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/User");
const tokenService = require("../services/tokenService");
const redisClient = require("../utils/redis");
const cloudinary = require("../utils/cloudinaryConfig");

exports.register = async (req, res) => {
  const { email, password, name } = req.body;
  let profilePictureUrl = null;

  try {
    if (req.files.profilePicture) {
      profilePictureUrl = req.files.profilePicture[0].path;
      const result = await cloudinary.uploader.upload(profilePictureUrl);
      profilePictureUrl = result.url;
    }
    const verificationToken = crypto.randomBytes(20).toString("hex");

    const user = new User({
      email,
      password,
      name,
      profilePicture: profilePictureUrl,
      verificationToken,
    });
    await user.save();

    const verificationUrl = `https://${req.headers.host}/api/auth/verify-email?token=${verificationToken}`;
    const message = `Please verify your email by clicking on this link: ${verificationUrl}`;

    await sendEmail({
      to: user.email,
      subject: "Verify Email",
      text: message,
    });

    res.status(200).json({
      user,
      message: "Registration successful, please verify your email.",
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.verifyEmail = async (req, res) => {
  const { token } = req.query;
  try {
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.render("verifyEmail", {
        message: "Invalid or expired verification token.",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.render("verifyEmail", { message: "Email verification successful!" });
  } catch (error) {
    console.error("Email verification error:", error);
    res.render("verifyemail", {
      message: "Internal Server Error. Please try again later.",
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!user.isVerified) {
      return res.status(403).json({ error: "Email not verified" });
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
      // sameSite: "none",
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
      // sameSite: "none",
    });

    res.status(200).send({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).send({ message: `Internal server error: ${error}` });
  }
};
