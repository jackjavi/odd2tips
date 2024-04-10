const mongoose = require("mongoose");

const requestCountSchema = new mongoose.Schema({
  count: {
    type: Number,
    default: 1,
  },
  ipAddress: String,
  userAgent: String,
  language: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const RequestCount = mongoose.model("RequestCount", requestCountSchema);

module.exports = RequestCount;
