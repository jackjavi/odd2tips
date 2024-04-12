const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");
const authenticate = require("../middleware/authenticate");

router.post("/create", authenticate, roomController.createRoom);

router.get("/get", roomController.getAllRooms);

module.exports = router;
