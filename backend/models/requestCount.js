const mongoose = require("mongoose");

const requestCountSchema = new mongoose.Schema({
  count: {
    type: Number,
    default: 1,
  },
  ipAddress: String,
  userAgent: String,
  language: String,
  date: {
    type: Date,
    default: () => Date.now(),
    index: true,
  },
});

requestCountSchema.index({ date: 1, ipAddress: 1 }, { unique: true });

const RequestCount = mongoose.model("RequestCount", requestCountSchema);

module.exports = RequestCount;
