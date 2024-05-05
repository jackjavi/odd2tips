const Prediction = require("../models/Prediction");
const GameData = require("../models/GameData");
const mongoose = require("mongoose");
const { formatDate } = require("../utils/dateUtils");

exports.getPredictions = async (req, res) => {
  try {
    const today = new Date();
    const dateString = formatDate(today);

    const predictions = await Prediction.find({ date: dateString });

    if (predictions.length < 10) {
      console.error("Not enough predictions available.");
      return;
    }

    const shuffledPredictions = predictions.sort(() => 0.5 - Math.random());
    const selectedPredictions = shuffledPredictions.slice(0, 12);

    const firstRoomPredictions = selectedPredictions.slice(0, 3);
    const secondRoomPredictions = selectedPredictions.slice(4, 7);
    const thirdRoomPredictions = selectedPredictions.slice(8, 9);
    const fourthRoomPredictions = selectedPredictions.slice(10, 12);

    const firstRoomId = new mongoose.Types.ObjectId("6618dbf5ad0eed6ed54294b6");
    const secondRoomId = new mongoose.Types.ObjectId(
      "6627e05bef51f7e131a1a290"
    );
    const thirdRoomId = new mongoose.Types.ObjectId("6634d619c25268c539c0455b");
    const fourthRoomId = new mongoose.Types.ObjectId(
      "66374d04c1fc1ffbfedf9f64"
    );

    const firstRoomEntries = firstRoomPredictions.map((prediction) => ({
      gameTitle: prediction.competitionName,
      homeTeam: prediction.homeTeam,
      awayTeam: prediction.awayTeam,
      prediction: prediction.prediction,
      last5home: prediction.last5home,
      last5away: prediction.last5away,
      homeOdd: prediction.homeOdd,
      drawOdd: prediction.drawOdd,
      awayOdd: prediction.awayOdd,
      countryName: prediction.countryName,
      roomId: firstRoomId,
      date: prediction.date,
    }));

    const secondRoomEntries = secondRoomPredictions.map((prediction) => ({
      gameTitle: prediction.competitionName,
      homeTeam: prediction.homeTeam,
      awayTeam: prediction.awayTeam,
      prediction: prediction.prediction,
      last5home: prediction.last5home,
      last5away: prediction.last5away,
      homeOdd: prediction.homeOdd,
      drawOdd: prediction.drawOdd,
      awayOdd: prediction.awayOdd,
      countryName: prediction.countryName,
      roomId: secondRoomId,
      date: prediction.date,
    }));

    const thirdRoomEntries = thirdRoomPredictions.map((prediction) => ({
      gameTitle: prediction.competitionName,
      homeTeam: prediction.homeTeam,
      awayTeam: prediction.awayTeam,
      prediction: prediction.prediction,
      last5home: prediction.last5home,
      last5away: prediction.last5away,
      homeOdd: prediction.homeOdd,
      drawOdd: prediction.drawOdd,
      awayOdd: prediction.awayOdd,
      countryName: prediction.countryName,
      roomId: thirdRoomId,
      date: prediction.date,
    }));

    const fourthRoomEntries = fourthRoomPredictions.map((prediction) => ({
      gameTitle: prediction.competitionName,
      homeTeam: prediction.homeTeam,
      awayTeam: prediction.awayTeam,
      prediction: prediction.prediction,
      last5home: prediction.last5home,
      last5away: prediction.last5away,
      homeOdd: prediction.homeOdd,
      drawOdd: prediction.drawOdd,
      awayOdd: prediction.awayOdd,
      countryName: prediction.countryName,
      roomId: fourthRoomId,
      date: prediction.date,
    }));

    await GameData.insertMany(
      firstRoomEntries
        .concat(secondRoomEntries)
        .concat(thirdRoomEntries)
        .concat(fourthRoomEntries)
    );

    console.log("GameData entries successfully created for both rooms.");
    res.status(200).json({ message: "Predictions allocated to rooms." });
  } catch (error) {
    console.error("Failed to allocate predictions to rooms:", error);
  }
};
