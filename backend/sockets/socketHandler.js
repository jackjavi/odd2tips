const { verifyToken } = require("../services/tokenService");
const Message = require("../models/Message");

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected");

    const token = socket.handshake.query.token;

    if (token) {
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
        return;
      }
    } else {
      if (!socket.userId) {
        console.log("No user ID found for socket, ignoring message.");
        return;
      }
    }

    socket.on("chat message", async (msgContent) => {
      try {
        const message = new Message({
          user: socket.userId,
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
