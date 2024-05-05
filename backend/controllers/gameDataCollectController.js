const GameData = require("../models/GameData");
const { formatDate } = require("../utils/dateUtils");

exports.getGameData = async (req, res) => {
  const today = new Date();
  const todayFormatted = formatDate(today); // "Wednesday, May 1st, 2024"

  const { roomId } = req.query;
  console.log(roomId);

  try {
    const gameData = await GameData.find({
      date: todayFormatted,
      roomId: roomId,
    });

    if (!gameData.length) {
      return res.status(404).json({ message: "No game data found for today." });
    }

    res.json(gameData);
  } catch (error) {
    console.error("Error getting game data:", error);
    res.status(500).json({ message: "Failed to fetch game data" });
  }
};
