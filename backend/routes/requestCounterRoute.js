const express = require("express");
const router = express.Router();
const requestCounterController = require("../controllers/requestCounterController");

router.get("/requestCount", requestCounterController.getRequestCount);

module.exports = router;
