const express = require("express");
const axios = require("axios");
const router = express.Router();
const User = require("../models/User");
const tokenService = require("../services/tokenService");
const redisClient = require("../utils/redis");
const { v4: uuidv4 } = require("uuid");

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URL;

// Initiates the Google Login flow
router.get("/auth/google", (req, res) => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
  res.redirect(url);
});

// Callback URL for handling the Google Login response
router.get("/auth/google/callback", async (req, res) => {
  const { code } = req.query;

  try {
    // Exchange authorization code for access token
    const { data } = await axios.post("https://oauth2.googleapis.com/token", {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    });

    const { access_token, id_token } = data;

    // Use access_token or id_token to fetch user profile
    const { data: profile } = await axios.get(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    let user = await User.findOne({ email: profile.email });
    if (!user) {
      // User doesn't exist, create new user
      user = new User({
        email: profile.email,

        name: profile.name,
        profilePicture: profile.picture,
        isVerified: true, // Set to true since Google has verified this user
      });
      await user.save();
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

    req.user = profile;

    res.cookie("token", token, {
      httpOnly: true,
      // sameSite: "none",
      maxAge: 43200000, // 12 hours (12 * 60 * 60 * 1000 milliseconds)
    });

    // Code to handle user authentication and retrieval using the profile data
    console.log("User profile:", profile);

    res.redirect("http://localhost:3000/");
  } catch (error) {
    console.error("Error:", error.response.data.error);
    res.redirect("http://localhost:3000/login");
  }
});

module.exports = router;
