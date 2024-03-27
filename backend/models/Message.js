const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    userName: String,
    userProfilePicture: String,
    content: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
