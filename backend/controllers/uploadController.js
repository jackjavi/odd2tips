const BlogPost = require("../models/BlogPost");
const cloudinary = require("../utils/cloudinaryConfig");

exports.handleFileUpload = async (req, res) => {
  try {
    const { title, content, authorName, excerpt } = req.body;
    let coverImageUrl, authorImageUrl;

    if (req.files.coverImage) {
      const coverImage = req.files.coverImage[0];
      const coverResult = await cloudinary.uploader.upload(coverImage.path);
      coverImageUrl = coverResult.url;
    }

    if (req.files.authorImage) {
      const authorImage = req.files.authorImage[0];
      const authorResult = await cloudinary.uploader.upload(authorImage.path);
      authorImageUrl = authorResult.url;
    }

    const blogPost = new BlogPost({
      title,
      content,
      authorName,
      excerpt,
      coverImagePath: coverImageUrl,
      authorImagePath: authorImageUrl,
    });

    await blogPost.save();

    res.status(200).json({
      message: "Files uploaded and post saved successfully!",
      data: blogPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error saving the blog post" });
  }
};
