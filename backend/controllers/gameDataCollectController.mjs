import GameData from "../models/GameData.mjs";
import Room from "../models/Room.mjs";
import { formatDate } from "../utils/dateUtils.mjs";

const getGameData = async (req, res) => {
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
const getRandomGameData = async (req, res) => {
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
    if (!gameData.length) {
      return res.status(404).json({});
    }
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

const getRandomGameforTweets = async (req, res) => {
  try {
    const games = await GameData.find({});

    const randomIndex = Math.floor(Math.random() * games.length);
    const randomGame = games[randomIndex];

    if (randomGame) {
      res.status(200).json(randomGame);
    } else {
      res.status(404).json({ message: "No games found in the database" });
    }
  } catch (error) {
    console.error("Error fetching random game from database:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { getGameData, getRandomGameData, getRandomGameforTweets };
