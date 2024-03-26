const express = require("express");
const router = express.Router();
const gameDataController = require("../controllers/gameDataController");

router.post("/gameData", gameDataController.createGameData);
router.get("/gameData", gameDataController.getGameData);

module.exports = router;
