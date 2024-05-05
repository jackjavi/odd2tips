const mongoose = require("mongoose");
const GameData = require("../models/GameData");
const PredictzResults = require("../models/PredictzResults");
const { formatDate } = require("../utils/dateUtils");

exports.analyzeResults = async (req, res) => {
  try {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const todayStr = formatDate(today);
    const yesterdayStr = formatDate(yesterday);

    const games = await GameData.find({
      date: { $in: [yesterdayStr, todayStr] },
    });

    let result;
    const updates = games.map(async (game) => {
      result = await PredictzResults.findOne({
        teamOne: game.homeTeam,
        teamTwo: game.awayTeam,
      });

      if (result) {
        game.status = result.status;
      } else {
        game.status = "Pending";
      }

      return game.save();
    });

    await Promise.all(updates);

    res.status(200).json({
      message: "Results analysis completed successfully.",
      updatedCount: updates.length,
    });
  } catch (error) {
    console.error("Error in results analysis:", error);
    res.status(500).json({
      message: "Failed to analyze results",
      error: error.message,
    });
  }
};
