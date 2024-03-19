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

  // Handle incoming chat messages
  socket.on("chat message", (msg) => {
    console.log(`Message: ${msg}`);
    // Broadcast message to all connected clients
    io.emit("chat message", msg);
  });

  // Handle socket disconnect
  socket.on("disconnect", () => {
    console.log("A user disconnected");
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
