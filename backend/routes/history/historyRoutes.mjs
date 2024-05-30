import express from "express";
import { getYesterdayHistory } from "../../controllers/history/historyController.mjs";

const router = express.Router();

router.get("/get-yesterday-history", getYesterdayHistory);

export default router;
