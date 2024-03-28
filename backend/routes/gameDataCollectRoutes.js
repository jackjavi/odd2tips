const express = require("express");
const router = express.Router();
const gameDataController = require("../controllers/gameDataCollectController");

router.get("/gameDataCollect", gameDataCollectController.getGameData);

module.exports = router;
