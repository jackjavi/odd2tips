const express = require("express");
const router = express.Router();
const getPredictionsController = require("../controllers/getPredictionsController");

router.get("/predictz", getPredictionsController.getPredictions);

module.exports = router;
