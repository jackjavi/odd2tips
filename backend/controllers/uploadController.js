const BlogPost = require("../models/BlogPost");

exports.handleFileUpload = async (req, res) => {
  try {
    const { title, content, authorName } = req.body;
    const coverImagePath = req.files["coverImage"]
      ? req.files["coverImage"][0].path
      : "";
    const authorImagePath = req.files["authorImage"]
      ? req.files["authorImage"][0].path
      : "";

    const blogPost = new BlogPost({
      title,
      content,
      authorName,
      coverImagePath,
      authorImagePath,
    });

    await blogPost.save();

    res.send({
      message: "Files uploaded and post saved successfully!",
      data: blogPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error saving the blog post" });
  }
};
