import express from "express";
import {
  fetchFootballFixtures,
  fetchFootballNews,
  fetchFootballResults,
  scrapePredictions,
  scrapeBBCSport,
  scrapeBBCArticles,
  cleanData,
} from "../controllers/scrapedDataController.mjs";
import isAppAdmin from "../middleware/isAppAdmin.mjs";

const router = express.Router();

router.get("/results", fetchFootballResults);
router.get("/fixtures", fetchFootballFixtures);
router.get("/news", fetchFootballNews);
router.get("/predictions", scrapePredictions);
router.get("/bbc-sport", scrapeBBCSport);
router.get("/bbc-articles", scrapeBBCArticles);
router.get("/clean", cleanData);

export default router;
