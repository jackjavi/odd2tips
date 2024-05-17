import callback from "../../controllers/twitter/callbackController.mjs";
import express from "express";
import callbackcontroller from "../../controllers/twitter/callbackController.mjs";

const router = express.Router();

router.get("/callback", callbackcontroller);

export default router;
