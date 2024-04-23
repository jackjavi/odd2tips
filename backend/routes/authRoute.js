const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");
const upload = require("../utils/upload");
const authenticate = require("../middleware/authenticate");

router.post("/register", upload, AuthController.register);
router.get("/verify-email", AuthController.verifyEmail);
router.patch("/updateProfile", authenticate, AuthController.updateProfile);

router.post("/google/exchange-ott", AuthController.exchangeOTT);

router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);

module.exports = router;
