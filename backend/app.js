require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());
const http = require("http").createServer(app);
const cors = require("cors");
app.use(cors());
const connectDatabase = require("./utils/database");
const authRoutes = require("./routes/authRoute");
const sportMonksRoutes = require("./routes/sportMonksRoute");
const authenticate = require("./middleware/authenticate");
const socketHandler = require("./sockets/socketHandler");
const chatRoutes = require("./routes/chatRoutes");
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",

    credentials: true,
  },
});
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
app.use("/api/chat", chatRoutes);

socketHandler(io);

app.get("/", authenticate, (req, res) => {
  res.send("<h1>Hello World</h1>");
});

const PORT = 8888;
http.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
