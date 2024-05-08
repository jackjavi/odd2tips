const express = require("express");
const router = express.Router();
const getResultsController = require("../controllers/getResultsController");
const scrapedDataController = require("../controllers/scrapedDataController");
const isAppAdmin = require("../middleware/authenticate");

router.get("/get-results", getResultsController.getResults);
router.get(
  "/results-predictz",
  isAppAdmin,
  scrapedDataController.fetchPredictzResults
);

module.exports = router;
