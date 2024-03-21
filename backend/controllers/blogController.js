const BlogPost = require("../models/BlogPost");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching posts" });
  }
};

exports.getPostBySlug = async (req, res) => {
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
