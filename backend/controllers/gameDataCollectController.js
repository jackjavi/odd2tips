const GameData = require("../models/GameData");
const RequestCount = require("../models/requestCount");
const moment = require("moment");

exports.getGameData = async (req, res) => {
  const endpoint = "gameDataCollect";
  const todayStart = moment().startOf("day");
  const todayEnd = moment().endOf("day");

  try {
    const requestCounter = await RequestCount.findOneAndUpdate(
      { endpoint },
      {
        $inc: { count: 1 },
        $set: {
          ipAddress: req.ip,
          userAgent: req.headers["user-agent"],
          language: req.headers["accept-language"],
        },
      },
      { new: true, upsert: true }
    );
    console.log("Request count:", requestCounter.count);

    const gameData = await GameData.find({
      startTime: {
        $gte: todayStart.toDate(),
        $lte: todayEnd.toDate(),
      },
    });

    res.json(gameData);
  } catch (error) {
    console.error("Error getting game data:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch game data or update request count" });
  }
};
