import express from "express";
import { getTweetsController } from "../../controllers/twitter/getTweetsController.mjs";

const router = express.Router();

router.get("/get-tweets", getTweetsController);

export default router;
