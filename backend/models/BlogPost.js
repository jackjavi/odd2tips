const mongoose = require("mongoose");

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .trim();
}

const blogPostSchema = new mongoose.Schema({
  title: String,
  content: String,
  authorName: String,
  coverImagePath: String,
  authorImagePath: String,
  date: { type: Date, default: Date.now },
  slug: { type: String, unique: true },
});

blogPostSchema.pre("save", function (next) {
  if (this.isModified("title") || !this.slug) {
    this.slug = slugify(this.title);
  }
  next();
});

const BlogPost = mongoose.model("BlogPost", blogPostSchema);
module.exports = BlogPost;
