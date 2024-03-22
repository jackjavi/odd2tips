const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/uploadController");
const upload = require("../utils/upload");

router.post("/upload", upload, uploadController.handleFileUpload);
module.exports = router;
