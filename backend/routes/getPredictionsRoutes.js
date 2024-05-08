const express = require("express");
const router = express.Router();
const getPredictionsController = require("../controllers/getPredictionsController");
const isAppAdmin = require("../middleware/authenticate");

router.get("/predictz", isAppAdmin, getPredictionsController.getPredictions);

module.exports = router;
