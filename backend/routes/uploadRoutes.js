const express = require("express");
const router = express.Router();
const upload = require("../utils/upload");
const uploadController = require("../controllers/uploadController");

// Post files
router.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(500).send({ message: err });
    } else {
      if (req.files == undefined) {
        res.status(400).send({ message: "No file selected!" });
      } else {
        // Handle the rest in controller
        uploadController.handleFileUpload(req, res);
      }
    }
  });
});

module.exports = router;
