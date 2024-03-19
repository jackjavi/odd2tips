require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000", // Adjusted to frontend's URL
    methods: ["GET", "POST"], // Allowed HTTP methods
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
  next();
});

// Middleware for serving static files, if necessary (e.g., public directory)
app.use(express.static("public"));

connectDatabase();
app.use("/api/auth", authRoutes);
app.use("/api/", authenticate, sportMonksRoutes);

io.on("connection", (socket) => {
  console.log("A user connected");

  // Extract token from handshake query
  const token = socket.handshake.query.token;

  if (token) {
    // Safely attempt to verify the token
    const verificationResult = verifyToken(token);

    if (verificationResult) {
      // Token is valid, set userId for the socket session
      const { userId } = verificationResult;
      socket.userId = userId;
      console.log(
        "Authenticated socket connection",
        socket.id,
        "User ID:",
        userId
      );
    } else {
      // Token verification failed, log the error and disconnect the socket
      console.log("Token verification failed, disconnecting socket.");
      socket.disconnect(true);
      return;
    }
  } else {
    // No token provided, disconnect the socket
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

// Define a route for HTTP GET requests to the root ("/")
app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>"); // Placeholder response, adjust as needed
});

// Start the server
const PORT = 8888;
http.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
