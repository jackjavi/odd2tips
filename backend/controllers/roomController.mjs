import Room from "../models/Room.mjs";
import User from "../models/User.mjs";
import mongoose from "mongoose";

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .trim();
}

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

const updateRoomMembers = async (req, res) => {
  try {
    const { roomId, userId } = req.query;

    const objectId = new mongoose.Types.ObjectId(roomId);

    const room = await Room.find({ _id: objectId });
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const userIdObject = new mongoose.Types.ObjectId(userId);

    room.members.push(userIdObject);
    await room.save();

    res.status(200).json(room);
  } catch (error) {
    console.log(error.message + " from updateRoomMembers");
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

const slugifyRooms = async (req, res) => {
  try {
    const rooms = await Room.find().sort({ createdAt: -1 });

    const updatedRooms = await Promise.all(
      rooms.map(async (room) => {
        room.slug = slugify(room.title);
        await room.save();
        return room;
      })
    );

    res.status(200).json(updatedRooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const isFollowing = async (req, res) => {
  try {
    const { roomId, userId } = req.query;

    const objectId = new mongoose.Types.ObjectId(roomId);

    const room = await Room.find({ _id: objectId });
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const isFollowing = room.members.includes(userId);
    if (!isFollowing) {
      return res.status(200).json({ isFollowing });
    }

    const userIdObject = new mongoose.Types.ObjectId(userId);

    const profile = await User.findById(userIdObject).select(
      "name email profilePicture"
    );

    res.status(200).json({ isFollowing, profile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createRoom,
  getAllRooms,
  getRoomByTitle,
  slugifyRooms,
  updateRoomMembers,
  isFollowing,
};
