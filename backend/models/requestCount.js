const mongoose = require("mongoose");

const requestCountSchema = new mongoose.Schema({
  count: {
    type: Number,
    required: true,
    default: 0,
  },
  ipAddress: {
    type: String,
  },
  userAgent: {
    type: String,
  },
  language: {
    type: String,
  },
});

const RequestCount = mongoose.model("RequestCount", requestCountSchema);

module.exports = RequestCount;
