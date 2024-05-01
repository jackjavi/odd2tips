const GameData = require("../models/GameData");
const moment = require("moment");

function formatDate(d) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const suffixes = [
    "th",
    "st",
    "nd",
    "rd",
    "th",
    "th",
    "th",
    "th",
    "th",
    "th",
    "th",
    "th",
    "th",
    "th",
    "th",
    "th",
    "th",
    "th",
    "th",
    "th",
    "st",
    "nd",
    "rd",
    "th",
    "th",
    "th",
    "th",
    "th",
    "th",
    "th",
    "st",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  let suffix = suffixes[date] || "th";

  return `${day}, ${month} ${date}${suffix}, ${year}`;
}

exports.getGameData = async (req, res) => {
  const today = new Date();
  const todayFormatted = formatDate(today); // "Wednesday, May 1st, 2024"
  console.log(todayFormatted);

  const { roomId } = req.query;
  console.log(roomId);
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    // Fetch game data matching the formatted date and room ID
    const gameData = await GameData.find({
      date: todayFormatted, // Ensure this field name matches the one used in your schema
      roomId: roomId,
    });

    if (!gameData.length) {
      return res.status(404).json({ message: "No game data found for today." });
    }

    res.json(gameData);
  } catch (error) {
    console.error("Error getting game data:", error);
    res.status(500).json({ message: "Failed to fetch game data" });
  }
};
