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

    let roomsData = [];
    for (const record of history) {
      if (record.status === "WON") {
        const room = await Room.findById(record.roomId);

        roomsData.push({
          title: room.title,
          roomId: room._id,
          adminId: room.adminId,
          slug: room.slug,
        });
      }
    }

    const message = generateCelebratoryMessage(roomsData);

    res.status(200).json({ message });
  } catch (error) {
    console.error("Error getting history:", error);
    res.status(500).json({ message: "Failed to fetch history" });
  }
};

const generateCelebratoryMessage = (roomsData) => {
  let message =
    "THE FOLLOWING ROOMS WON YESTERDAY.\n\nLET'S CONGRATULATE ALL THE WINNERS:\n\n";
  roomsData.forEach(({ title, roomId, adminId, slug }) => {
    const url = `https://www.odd2tips.com/rooms/${slug}?roomId=${roomId}`;
    message += `${title} - 🔗 ${url}\n`;
  });
  message += "\n🎈🎉🎊🎈🎉🎊";
  return message;
};

// https://www.odd2tips.com/rooms/league-of-champions-?roomId=663b536c43ce48e99acb6ea3&adminId=661f9e53a8cbd4dee8e6b58a&roomTitle=LEAGUE%20OF%20CHAMPIONS%20%F0%9F%8F%86&roomSlug=league-of-champions-

export { getYesterdayHistory };
