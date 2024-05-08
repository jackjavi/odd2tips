import express from "express";
import {
  createRoom,
  getAllRooms,
  getRoomByTitle,
} from "../controllers/roomController.mjs";
import authenticate from "../middleware/authenticate.mjs";

const router = express.Router();

router.post("/create", authenticate, createRoom);

router.get("/get", getAllRooms);

router.get("/get/:title", getRoomByTitle);

export default router;
