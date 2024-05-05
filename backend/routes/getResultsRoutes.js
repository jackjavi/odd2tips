const express = require("express");
const router = express.Router();
const getResultsController = require("../controllers/getResultsController");
const scrapedDataController = require("../controllers/scrapedDataController");

router.get("/get-results", getResultsController.getResults);
router.get("/results-predictz", scrapedDataController.fetchPredictzResults);

module.exports = router;
