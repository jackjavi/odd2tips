const GameData = require("../models/GameData");
const RequestCount = require("../models/requestCount");
const moment = require("moment");

exports.getGameData = async (req, res) => {
  const todayStart = moment().startOf("day");
  const todayEnd = moment().endOf("day");
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    let requestCounter = await RequestCount.findOne({
      date: {
        $gte: todayStart.toDate(),
        $lte: todayEnd.toDate(),
      },
      ipAddress: ip,
    });

    if (requestCounter) {
      requestCounter.count += 1;
    } else {
      requestCounter = new RequestCount({
        count: 1,
        ipAddress: ip,
        userAgent: req.headers["user-agent"],
        language: req.headers["accept-language"],
        date: new Date(),
      });
    }

    await requestCounter.save();

    const gameData = await GameData.find({
      startTime: {
        $gte: todayStart.toDate(),
        $lte: todayEnd.toDate(),
      },
    });

    res.json({ gameData, requestInfo: requestCounter });
  } catch (error) {
    console.error("Error getting game data:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch game data or log request" });
  }
};
