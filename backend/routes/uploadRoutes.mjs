import express from "express";
import { handleFileUpload } from "../controllers/uploadController.mjs";
import upload from "../utils/upload.mjs";
const router = express.Router();

router.post("/upload", upload, handleFileUpload);

export default router;
