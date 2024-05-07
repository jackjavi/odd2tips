const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    date: { type: String, required: true },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    status: {
      type: String,
      enum: ["WON", "LOST", "UNAVAILABLE", "Pending"],
      required: true,
    },
  },
  { timestamps: true }
);

const History = mongoose.model("History", historySchema);

module.exports = History;
