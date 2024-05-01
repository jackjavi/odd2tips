const mongoose = require("mongoose");

const PredictionSchema = new mongoose.Schema(
  {
    homeTeam: {
      type: String,
      required: true,
    },
    awayTeam: {
      type: String,
      required: true,
    },
    last5home: [String],
    last5away: [String],
    prediction: String,
    matchUrl: String,
    odds: [String],
    date: String,
    competitionName: String,
    countryName: String,
  },
  {
    timestamps: true,
  }
);

const Prediction = mongoose.model("Prediction", PredictionSchema);

module.exports = Prediction;
