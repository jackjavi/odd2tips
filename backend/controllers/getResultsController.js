const Result = require("../models/Result");

exports.getResults = async (req, res) => {
  try {
    const results = await Result.find().sort({ date: 1 });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).send("Server Error: " + error.message);
  }
};
