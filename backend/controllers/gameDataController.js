const GameData = require("../models/GameData");

exports.createGameData = async (req, res) => {
  try {
    const gameData = new GameData(req.body);
    await gameData.save();
    res.status(201).json(gameData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getGameData = async (req, res) => {
  try {
    const gameData = await GameData.find();
    res.json(gameData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
