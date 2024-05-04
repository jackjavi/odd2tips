const Prediction = require("../models/Prediction");
const GameData = require("../models/GameData");
const mongoose = require("mongoose");

function formatDate(d) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const suffixes = [
    "th",
    "st",
    "nd",
    "rd",
    "th",
    "th",
    "th",
    "th",
    "th",
    "th",
    "th",
    "th",
    "th",
    "th",
    "th",
    "th",
    "th",
    "th",
    "th",
    "th",
    "st",
    "nd",
    "rd",
    "th",
    "th",
    "th",
    "th",
    "th",
    "th",
    "th",
    "st",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  let suffix = suffixes[date] || "th";

  return `${day}, ${month} ${date}${suffix}, ${year}`;
}

exports.getPredictions = async (req, res) => {
  try {
    const today = new Date();
    const dateString = formatDate(today);

    const predictions = await Prediction.find({ date: dateString });

    // Check if there are enough predictions
    if (predictions.length < 13) {
      console.error("Not enough predictions available.");
      return;
    }

    // Shuffle array and pick 10 random predictions
    const shuffledPredictions = predictions.sort(() => 0.5 - Math.random());
    const selectedPredictions = shuffledPredictions.slice(0, 13);

    // Divide predictions into two groups of 5 each
    const firstRoomPredictions = selectedPredictions.slice(0, 4);
    const secondRoomPredictions = selectedPredictions.slice(5, 7);
    const thirdRoomPredictions = selectedPredictions.slice(8, 13);

    // Room IDs
    const firstRoomId = new mongoose.Types.ObjectId("6618dbf5ad0eed6ed54294b6");
    const secondRoomId = new mongoose.Types.ObjectId(
      "6627e05bef51f7e131a1a290"
    );
    const thirdRoomId = new mongoose.Types.ObjectId("6634d619c25268c539c0455b");

    // Create GameData entries for the first room
    const firstRoomEntries = firstRoomPredictions.map((prediction) => ({
      gameTitle: prediction.competitionName,
      homeTeam: prediction.homeTeam,
      awayTeam: prediction.awayTeam,
      prediction: prediction.prediction,
      last5home: prediction.last5home,
      last5away: prediction.last5away,
      odds: prediction.odds,
      countryName: prediction.countryName,
      roomId: firstRoomId,
      date: prediction.date,
    }));

    // Create GameData entries for the second room
    const secondRoomEntries = secondRoomPredictions.map((prediction) => ({
      gameTitle: prediction.competitionName,
      homeTeam: prediction.homeTeam,
      awayTeam: prediction.awayTeam,
      prediction: prediction.prediction,
      last5home: prediction.last5home,
      last5away: prediction.last5away,
      odds: prediction.odds,
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
      odds: prediction.odds,
      countryName: prediction.countryName,
      roomId: thirdRoomId,
      date: prediction.date,
    }));

    // Save all entries to the database
    await GameData.insertMany(
      firstRoomEntries.concat(secondRoomEntries).concat(thirdRoomEntries)
    );

    console.log("GameData entries successfully created for both rooms.");
    res.status(200).json({ message: "Predictions allocated to rooms." });
  } catch (error) {
    console.error("Failed to allocate predictions to rooms:", error);
  }
};
