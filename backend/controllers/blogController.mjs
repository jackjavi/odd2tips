import BlogPost from "../models/BlogPost.mjs";
import BlogPostTest from "../models/BlogPostTest.mjs";
import markdownIt from "markdown-it";

const getAllPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching posts" });
  }
};

const getAllPostsTest = async (req, res) => {
  try {
    const posts = await BlogPostTest.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching posts" });
  }
};
const getPostsByToday = async (req, res) => {
  try {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(today.getDate()).padStart(2, "0");

    const startOfDay = new Date(`${year}-${month}-${day}T00:00:00.000Z`);
    const endOfDay = new Date(`${year}-${month}-${day}T23:59:59.999Z`);

    const posts = await BlogPostTest.find({
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    }).sort({ date: -1 });

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching posts" });
  }
};

const getPostBySlug = async (req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching post" });
  }
};

const getPostBySlugTest = async (req, res) => {
  try {
    const post = await BlogPostTest.findOne({ slug: req.params.slug });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching post" });
  }
};

const fetchAndModifyBlogPosts = async (req, res) => {
  try {
    const blogPosts = await BlogPost.find();

    blogPosts.forEach(async (post) => {
      if (!post.markdown) {
        post.markdown = post.content;
      }

      if (!post.excerpt) {
        post.excerpt = post.content.slice(0, 200);
      }

      if (!post.fileUrls) {
        post.fileUrls = [post.coverImagePath];
      }

      await post.save();
    });

    console.log("BlogPosts modified successfully");
  } catch (error) {
    console.error("Error modifying BlogPosts:", error);
  }
};

const convertContentToMarkdown = async (req, res) => {
  const md = new markdownIt();
  try {
    const blogPosts = await BlogPost.find();

    for (const post of blogPosts) {
      post.content = md.render(post.content);
      await post.save();
    }

    console.log("Content converted to markdown successfully");
    res
      .status(200)
      .json({ message: "Content converted to markdown successfully" });
  } catch (error) {
    console.error("Error converting content to markdown:", error);
    res.status(500).json({ message: "Failed to convert content to markdown" });
  }
};

export {
  getAllPosts,
  getPostBySlug,
  getAllPostsTest,
  getPostsByToday,
  getPostBySlugTest,
  fetchAndModifyBlogPosts,
  convertContentToMarkdown,
};
