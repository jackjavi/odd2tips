const mongoose = require("mongoose");

const fixtureSchema = new mongoose.Schema(
  {
    fullDate: String,
    teamOne: String,
    teamTwo: String,
    matchId: String,
    time: String,
    league: String,
    location: String,
    status: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Fixture", fixtureSchema);
