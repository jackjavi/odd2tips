const express = require("express");
const router = express.Router();
const analyzeResultsController = require("../controllers/analyzeResultsController");
const isAppAdmin = require("../middleware/authenticate");

router.get(
  "/analyze-results",
  isAppAdmin,
  analyzeResultsController.analyzeResults
);

module.exports = router;
