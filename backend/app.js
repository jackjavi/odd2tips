require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

const connectDatabase = require("./utils/database");
const authRoutes = require("./routes/authRoute");
const sportMonksRoutes = require("./routes/sportMonksRoute");
const authenticate = require("./middleware/authenticate");
const Message = require("./models/Message");
const { verifyToken } = require("./services/tokenService");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.static("public"));

connectDatabase();
app.use("/api/auth", authRoutes);
app.use("/api/", authenticate, sportMonksRoutes);

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
    console.log("No token provided, disconnecting socket.");
    socket.disconnect(true);
    return;
  }

  socket.on("chat message", async (msgContent) => {
    if (!socket.userId) {
      console.log("No user ID found for socket, ignoring message.");
      return;
    }

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

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

const PORT = 8888;
http.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
