const express = require("express");
const router = express.Router();
const gameDataCollectController = require("../controllers/gameDataCollectController");

router.get("/gameDataCollect", gameDataCollectController.getGameData);

module.exports = router;
