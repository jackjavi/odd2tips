const express = require("express");
const router = express.Router();
const gameDataController = require("../controllers/gameDataController");

router.post("/gameData", gameDataController.createGameData);
router.put("/gameData/:id", gameDataController.editGameData);

module.exports = router;
