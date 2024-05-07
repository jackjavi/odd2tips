const express = require("express");
const router = express.Router();
const HistoryController = require("../controllers/historyController");

router.get("/create-history", HistoryController.createHistory);
router.get("/get-history", HistoryController.getHistory);

module.exports = router;
