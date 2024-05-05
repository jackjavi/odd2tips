const express = require("express");
const router = express.Router();
const analyzeResultsController = require("../controllers/analyzeResultsController");

router.get("/analyze-results", analyzeResultsController.analyzeResults);

module.exports = router;
