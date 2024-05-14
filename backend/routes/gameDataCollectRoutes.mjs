import express from "express";
import {
  getGameData,
  getRandomGameData,
  getRandomGameforTweets,
} from "../controllers/gameDataCollectController.mjs";
import { getGameDataAllDates } from "../controllers/gameDataCollectAllDatesController.mjs";

const router = express.Router();

router.get("/gameDataCollect", getGameData);
router.get("/gameDataCollectAllDates", getGameDataAllDates);
router.get("/randomGameData", getRandomGameData);
router.get("/twitter-data", getRandomGameforTweets);

export default router;
