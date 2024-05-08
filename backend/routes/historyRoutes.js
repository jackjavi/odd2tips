const express = require("express");
const router = express.Router();
const HistoryController = require("../controllers/historyController");
const isAppAdmin = require("../middleware/authenticate");

router.get("/create-history", isAppAdmin, HistoryController.createHistory);
router.get("/get-history", HistoryController.getHistory);

module.exports = router;
