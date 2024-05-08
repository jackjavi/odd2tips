const express = require("express");
const router = express.Router();
const scrapedDataController = require("../controllers/scrapedDataController");
const isAppAdmin = require("../middleware/authenticate");

router.get("/results", scrapedDataController.fetchFootballResults);
router.get("/fixtures", scrapedDataController.fetchFootballFixtures);
router.get("/news", scrapedDataController.fetchFootballNews);
router.get("/predictions", isAppAdmin, scrapedDataController.scrapePredictions);

module.exports = router;
