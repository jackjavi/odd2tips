import express from "express";
import { getAllPosts, getPostBySlug } from "../controllers/blogController.mjs";

const router = express.Router();

router.get("/posts", getAllPosts);
router.get("/posts/:slug", getPostBySlug);

export default router;
