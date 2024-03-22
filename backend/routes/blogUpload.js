// routes/blogUpload.js
const express = require("express");
const multer = require("multer");
const { uploadImage } = require("../controllers/uploadController");

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Temporary upload directory

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    // The path to the temporary file saved by Multer
    const imagePath = req.file.path;

    // Upload the image to Cloudinary
    const result = await uploadImage(imagePath);
    res.json({ message: "Upload successful", data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to upload image" });
  }
});

module.exports = router;
