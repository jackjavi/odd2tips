const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema({
  title: String,
  content: String,
  authorName: String,
  coverImagePath: String,
  authorImagePath: String,
  date: { type: Date, default: Date.now },
});

const BlogPost = mongoose.model("BlogPost", blogPostSchema);
module.exports = BlogPost;
