const GameData = require("../models/GameData");
const RequestCount = require("../models/RequestCount");
const moment = require("moment");

exports.getGameData = async (req, res) => {
  const todayStart = moment().startOf("day");
  const todayEnd = moment().endOf("day");
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    const newRequestCount = new RequestCount({
      endpoint: "gameDataCollect",
      ipAddress: ip,
      userAgent: req.headers["user-agent"],
      language: req.headers["accept-language"],
    });
    await newRequestCount.save();

    const gameData = await GameData.find({
      startTime: {
        $gte: todayStart.toDate(),
        $lte: todayEnd.toDate(),
      },
    });

    res.json({ gameData, requestInfo: newRequestCount });
  } catch (error) {
    console.error("Error getting game data:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch game data or log request" });
  }
};
