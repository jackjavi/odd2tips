import Room from "../models/Room.mjs";

const createRoom = async (req, res) => {
  try {
    const { title, description, privacy, adminId } = req.body;

    const newRoom = new Room({
      title,
      description,
      privacy,
      adminId,
      members: [adminId],
    });

    const savedRoom = await newRoom.save();
    res.status(201).json(savedRoom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find().sort({ createdAt: -1 });
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRoomByTitle = async (req, res) => {
  try {
    const { title } = req.params;
    const room = await Room.findOne({ title });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createRoom, getAllRooms, getRoomByTitle };
