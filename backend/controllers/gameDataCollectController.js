const GameData = require("../models/GameData");
const redisClient = require("../utils/redis");

exports.getGameData = async (req, res) => {
  const requestCountKey = "gameDataCollectRequestCount";
  let requestCount;

  try {
    requestCount = await redisClient.myClient.incr(requestCountKey);
    console.log("Request count:", requestCount);

    const gameData = await GameData.find();

    res.json(gameData);
  } catch (error) {
    console.error("Error getting game data:", error);
    res.status(500).json({ message: "Failed to fetch game data" });
  }
};
