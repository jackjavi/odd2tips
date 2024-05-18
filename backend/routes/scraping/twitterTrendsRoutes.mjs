import express from "express";
import { scrapeTrends24 } from "../../controllers/scraping/twitterTrendsController.mjs";

const router = express.Router();

router.get("/trends254", scrapeTrends24);

export default router;
