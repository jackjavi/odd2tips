const express = require("express");
const router = express.Router();
const scrapedDataController = require("../controllers/scrapedDataController");

router.get("/get", scrapedDataController.scrapedData);
router.get("/results", scrapedDataController.fetchFootballResults);
router.get("/fixtures", scrapedDataController.fetchFootballFixtures);

module.exports = router;
