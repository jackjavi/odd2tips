const express = require("express");
const router = express.Router();
const getFootballFixturesController = require("../controllers/getFootballFixturesController");

router.get("/fixtures", getFootballFixturesController.getFootballFixtures);

module.exports = router;
