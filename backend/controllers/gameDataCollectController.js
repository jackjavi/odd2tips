const GameData = require("../models/GameData");
const RequestCount = require("../models/requestCount");
const moment = require("moment");

exports.getGameData = async (req, res) => {
  const todayStart = moment().startOf("day").toDate();
  const todayEnd = moment().endOf("day").toDate();
  const { roomId } = req.query;

  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    const updateDoc = {
      $inc: { count: 1 },
      $setOnInsert: {
        ipAddress: ip,
        userAgent: req.headers["user-agent"],
        language: req.headers["accept-language"],
        date: new Date(),
      },
    };

    const requestCounter = await RequestCount.findOneAndUpdate(
      { ipAddress: ip, date: { $gte: todayStart, $lte: todayEnd } },
      updateDoc,
      { new: true, upsert: true }
    );

    console.log("Request count:", requestCounter);

    const gameData = await GameData.find({
      startTime: {
        $gte: todayStart,
        $lte: todayEnd,
      },
      roomId: roomId,
    });

    res.json(gameData);
  } catch (error) {
    console.error("Error getting game data:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch game data or log request" });
  }
};
