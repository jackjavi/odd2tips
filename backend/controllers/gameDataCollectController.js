const GameData = require("../models/GameData");
const RequestCount = require("../models/requestCount");
const moment = require("moment");

exports.getGameData = async (req, res) => {
  const todayStart = moment().startOf("day").toDate();
  const todayEnd = moment().endOf("day").toDate();

  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const updateDoc = {
      $inc: { count: 1 },
      $setOnInsert: {
        ipAddress: ip,
        userAgent: req.headers["user-agent"],
        language: req.headers["accept-language"],
        date: today,
      },
    };

    const requestCounter = await RequestCount.findOneAndUpdate(
      { ipAddress: ip, date: today },
      updateDoc,
      { new: true, upsert: true }
    );

    console.log("Request count:", requestCounter);

    const gameData = await GameData.find({
      startTime: {
        $gte: todayStart,
        $lte: todayEnd,
      },
    });

    res.json(gameData);
  } catch (error) {
    console.error("Error getting game data:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch game data or log request" });
  }
};
