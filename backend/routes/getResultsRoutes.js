const express = require("express");
const router = express.Router();
const getResultsController = require("../controllers/getResultsController");

router.get("/get-results", getResultsController.getResults);

module.exports = router;
