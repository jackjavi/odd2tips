import express from "express";
import {
  getAllPosts,
  getPostBySlug,
  fetchAndModifyBlogPosts,
  convertContentToMarkdown,
} from "../controllers/blogController.mjs";

const router = express.Router();

router.get("/posts", getAllPosts);
router.get("/posts/:slug", getPostBySlug);
router.get("/fetch-modify-posts", fetchAndModifyBlogPosts);
router.get("/convert-content-to-markdown", convertContentToMarkdown);

export default router;
