const express = require("express");
const router = express.Router();
const sportmonks = require("../controllers/sportMonksController");

router.get("/fixtures", sportmonks.getFixtures);

module.exports = router;
