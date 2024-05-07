const express = require("express");
const router = express.Router();
const gameDataController = require("../controllers/gameDataController");

router.post("/gameData", gameDataController.createGameData);
router.put("/gameData/:id", gameDataController.editGameData);
router.delete("/gameData/:id", gameDataController.deleteGameData);

module.exports = router;
