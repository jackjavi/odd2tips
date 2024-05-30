import { formatDate } from "../../utils/dateUtils.mjs";
import History from "../../models/History.mjs";
import Room from "../../models/Room.mjs";

const getYesterdayHistory = async (req, res) => {
  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const date = formatDate(yesterday);

  try {
    const history = await History.find({ date });

    if (history.length === 0) {
      res.status(200).json([]);
      return;
    }

    let roomTitles = [];
    for (const record of history) {
      if (record.status === "WON") {
        const room = await Room.findById(record.roomId);
        roomTitles.push(room.title);
      }
    }

    const message = generateCelebratoryMessage(roomTitles);

    res.status(200).json({ message });
  } catch (error) {
    console.error("Error getting history:", error);
    res.status(500).json({ message: "Failed to fetch history" });
  }
};

const generateCelebratoryMessage = (roomTitles) => {
  let message =
    "THE FOLLOWING ROOMS WON YESTERDAY.\n\nLET'S CONGRATULATE ALL THE WINNERS:\n\n";
  roomTitles.forEach((title) => {
    message += `${title} - 🔗 https://www.odd2tips.com/rooms/${title}\n`;
  });
  message += "\n🎈🎉🎊🎈🎉🎊";
  return message;
};

export { getYesterdayHistory };
