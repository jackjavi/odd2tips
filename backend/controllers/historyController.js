const Room = require("../models/Room");
const GameData = require("../models/GameData");
const History = require("../models/History");
const { formatDate } = require("../utils/dateUtils");

exports.createHistory = async (req, res) => {
  try {
    const rooms = await Room.find();

    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return formatDate(date);
    });

    for (const room of rooms) {
      for (const date of last7Days) {
        await History.deleteMany({ date, roomId: room._id });

        const games = await GameData.find({ roomId: room._id, date: date });

        if (games.length === 0) {
          await History.create({
            date,
            roomId: room._id,
            status: "UNAVAILABLE",
          });
          console.log("No games found for room:", room.title, "on date:", date);
          continue;
        }

        const hasPendingGames = games.some((game) => game.status === "Pending");
        if (hasPendingGames) {
          await History.create({ date, roomId: room._id, status: "Pending" });
          console.log(
            "Pending games found for room:",
            room.title,
            "on date:",
            date
          );
          continue;
        }

        const isAllWon = games.every(
          (game) => game.status === game.prediction && game.status !== "Pending"
        );
        const status = isAllWon ? "WON" : "LOST";
        await History.create({ date, roomId: room._id, status });
        console.log(
          "Status for room:",
          room.title,
          "on date:",
          date,
          "is",
          status
        );
      }
    }

    console.log("History created successfully");
    res.status(200).json({ message: "History created successfully" });
  } catch (error) {
    console.error("Error creating history:", error);
    res
      .status(500)
      .json({ message: "Failed to create history", error: error.message });
  }
};

exports.getHistory = async (req, res) => {
  const { roomId } = req.query;

  try {
    const history = await History.find({ roomId });

    res.status(200).json(history);
  } catch (error) {
    console.error("Error getting history:", error);
    res.status(500).json({ message: "Failed to fetch history" });
  }
};
