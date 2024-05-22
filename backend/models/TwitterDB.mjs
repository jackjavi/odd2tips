import mongoose from "mongoose";

const twitterDBSchema = new mongoose.Schema({
  _id: String,
  title: String,
  timestamp: String,
  content: String,
  imageUrls: [String],
  formattedContent: String,
  excerpt: String,
});

const twitterDB = mongoose.model("twitterDB", twitterDBSchema);

export default twitterDB;
