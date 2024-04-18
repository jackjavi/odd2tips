const mongoose = require("mongoose");

const gameDataSchema = new mongoose.Schema(
  {
    gameTitle: { type: String, required: true }, // e.g. UEFA Champions League
    predictionType: { type: String, required: true }, // e.g. ODD2TIPS, JACKPOT, etc.
    startTime: { type: Date, required: true },
    homeTeam: { type: String, required: true },
    awayTeam: { type: String, required: true },
    prediction: { type: String, required: true },
    odd: { type: Number, required: true },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GameData", gameDataSchema);
