import express from "express";
import {
  createRoom,
  updateRoomMembers,
  getAllRooms,
  getRoomByTitle,
  slugifyRooms,
} from "../controllers/roomController.mjs";
import authenticate from "../middleware/authenticate.mjs";

const router = express.Router();

router.post("/create", authenticate, createRoom);

router.get("/get", getAllRooms);

router.get("/get/:title", getRoomByTitle);

router.get("/slugify", slugifyRooms);

router.put("/updateMembers/:id", authenticate, updateRoomMembers);

export default router;
