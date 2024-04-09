const express = require("express");
const router = express.Router();
const checkAuthController = require("../controllers/checkAuthController");

router.get("/checkAuth", checkAuthController.checkAuth);

module.exports = router;
