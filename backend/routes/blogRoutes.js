const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

router.get("/posts", blogController.getAllPosts);
router.get("/posts/:slug", blogController.getPostBySlug);

module.exports = router;
