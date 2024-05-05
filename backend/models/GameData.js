const mongoose = require("mongoose");

const gameDataSchema = new mongoose.Schema(
  {
    gameTitle: { type: String }, // e.g. UEFA Champions League
    predictionType: { type: String }, // e.g. ODD2TIPS, BETKING, etc.
    startTime: { type: Date },
    homeTeam: { type: String },
    awayTeam: { type: String },
    prediction: { type: String },
    odd: { type: Number },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    last5home: [String],
    last5away: [String],
    odds: [String],
    countryName: String,
    date: String,
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GameData", gameDataSchema);
