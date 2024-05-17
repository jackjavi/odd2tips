import express from "express";
import {
  fetchFootballFixtures,
  fetchFootballNews,
  fetchFootballResults,
  scrapePredictions,
} from "../controllers/scrapedDataController.mjs";
import isAppAdmin from "../middleware/isAppAdmin.mjs";

const router = express.Router();

router.get("/results", fetchFootballResults);
router.get("/fixtures", fetchFootballFixtures);
router.get("/news", fetchFootballNews);
router.get("/predictions", scrapePredictions);

export default router;
