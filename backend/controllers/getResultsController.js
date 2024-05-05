const Result = require("../models/Result");
const moment = require("moment");

exports.getResults = async (req, res) => {
  try {
    const todayDate = moment().format("MMMM YYYY dddd Do");
    const yesterdayDate = moment()
      .subtract(1, "days")
      .format("MMMM YYYY dddd Do MMMM");
    console.log(todayDate, yesterdayDate);

    const results = await Result.find({
      date: { $in: [todayDate, yesterdayDate] },
    }).sort({});

    res.status(200).json(results);
  } catch (error) {
    console.error("Server Error: ", error);
    res.status(500).send("Server Error: " + error.message);
  }
};
