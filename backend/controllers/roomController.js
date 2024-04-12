const Room = require("../models/Room");

exports.createRoom = async (req, res) => {
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

exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate("adminId", "name");
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
