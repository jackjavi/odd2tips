// gameDataCollectController.js

const GameData = require("../models/GameData");
const RequestCount = require("../models/requestCount");

exports.getGameData = async (req, res) => {
  const endpoint = "gameDataCollect";

  try {
    const requestCounter = await RequestCount.findOneAndUpdate(
      { endpoint },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );
    console.log("Request count:", requestCounter.count);

    const gameData = await GameData.find();

    res.json(gameData);
  } catch (error) {
    console.error("Error getting game data:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch game data or update request count" });
  }
};
