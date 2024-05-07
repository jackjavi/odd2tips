const GameData = require("../models/GameData");
const Room = require("../models/Room");
const { formatDate } = require("../utils/dateUtils");

exports.getGameData = async (req, res) => {
  const today = new Date();
  const todayFormatted = formatDate(today); // "Wednesday, May 1st, 2024"

  const { roomId } = req.query;

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

exports.getRandomGameData = async (req, res) => {
  const today = new Date();
  const todayFormatted = formatDate(today);

  try {
    const randomGameData = await GameData.aggregate([
      { $match: { date: todayFormatted } },
      { $sample: { size: 1 } },
    ]);

    if (!randomGameData.length) {
      return res.status(404).json({ message: "No game data found for today." });
    }

    const roomId = randomGameData[0].roomId;

    const roomTitle = await Room.findOne({ _id: roomId });

    const gameData = await GameData.find({ roomId, date: todayFormatted });
    const updatedGameData = gameData.map((game) => {
      return {
        ...game._doc,
        roomTitle: roomTitle.title,
      };
    });

    res.json(updatedGameData);
  } catch (error) {
    console.error("Error getting game data:", error);
    res.status(500).json({ message: "Failed to fetch game data" });
  }
};
