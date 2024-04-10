const { verifyToken } = require("../services/tokenService");
const Message = require("../models/Message");
const User = require("../models/User");

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    const cookies = socket.handshake.headers.cookie || "";
    const tokenCookie = cookies
      .split(";")
      .find((c) => c.trim().startsWith("token="));
    if (!tokenCookie) {
      console.log("No token found, disconnecting socket.");
      socket.disconnect(true);
      return;
    }
    const token = tokenCookie.split("=")[1];
    const verificationResult = verifyToken(token);

    if (verificationResult) {
      const { userId } = verificationResult;
      socket.userId = userId;
      console.log(
        "Authenticated socket connection",
        socket.id,
        "User ID:",
        userId
      );
    } else {
      console.log("Token verification failed, disconnecting socket.");
      socket.disconnect(true);
    }

    socket.on("chat message", async (msgContent) => {
      try {
        const user = await User.findById(socket.userId);
        if (!user) {
          console.error("User not found");
          return;
        }

        const message = new Message({
          user: user._id,
          userName: user.name,
          userProfilePicture: user.profilePicture,
          content: msgContent,
        });
        await message.save();
        io.emit("chat message", message);
      } catch (error) {
        console.error("Error saving message:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected", "User ID:", socket.userId);
    });
  });
};

module.exports = socketHandler;
