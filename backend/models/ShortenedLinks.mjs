import mongoose from "mongoose";

const shortenedLinkSchema = new mongoose.Schema(
  {
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const ShortenedLink = mongoose.model("ShortenedLink", shortenedLinkSchema);

export default ShortenedLink;
