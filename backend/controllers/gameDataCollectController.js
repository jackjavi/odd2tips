const GameData = require("../models/GameData");

exports.getGameData = async (req, res) => {
  try {
    const gameData = await GameData.find();
    res.json(gameData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
