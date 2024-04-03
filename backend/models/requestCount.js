const mongoose = require("mongoose");

const requestCountSchema = new mongoose.Schema({
  endpoint: {
    type: String,
    required: true,
    unique: true,
  },
  count: {
    type: Number,
    required: true,
    default: 0,
  },
});

const RequestCount = mongoose.model("RequestCount", requestCountSchema);

module.exports = RequestCount;
