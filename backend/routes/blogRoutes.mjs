import express from "express";
import {
  getAllPosts,
  getPostBySlug,
  getAllPostsTest,
  getPostBySlugTest,
  fetchAndModifyBlogPosts,
  convertContentToMarkdown,
} from "../controllers/blogController.mjs";

const router = express.Router();

router.get("/posts", getAllPosts);
router.get("/posts/:slug", getPostBySlug);
router.get("/posts-test", getAllPostsTest);
router.get("/posts-test/:slug", getPostBySlugTest);
router.get("/fetch-modify-posts", fetchAndModifyBlogPosts);
router.get("/convert-content-to-markdown", convertContentToMarkdown);

export default router;
