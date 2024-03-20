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
const socketHandler = require("./sockets/socketHandler");

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

socketHandler(io);

app.get("/", authenticate, (req, res) => {
  res.send("<h1>Hello World</h1>");
});

const PORT = 8888;
http.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
