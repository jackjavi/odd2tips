const express = require("express");
const router = express.Router();
const gameDataCollectController = require("../controllers/gameDataCollectController");
const gameDataCollectAllDatesController = require("../controllers/gameDataCollectAllDatesController");

router.get("/gameDataCollect", gameDataCollectController.getGameData);
router.get(
  "/gameDataCollectAllDates",
  gameDataCollectAllDatesController.getGameDataAllDates
);

module.exports = router;
