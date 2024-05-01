require("dotenv").config();

const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
const http = require("http").createServer(app);
const cors = require("cors");
app.use(cors());
app.use(cookieParser());
const connectDatabase = require("./utils/database");
const authRoutes = require("./routes/authRoute");
const googleAuth = require("./routes/googleAuth");
const uploadRoutes = require("./routes/uploadRoutes");
const blogRoutes = require("./routes/blogRoutes");
const sportMonksRoutes = require("./routes/sportMonksRoute");
const scrapedDataRoutes = require("./routes/scrapedDataRoutes");
const getResultsRoutes = require("./routes/getResultsRoutes");
const getPredictionsRoutes = require("./routes/getPredictionsRoutes");
const AppController = require("./routes/appRoutes");
const gameDataCollectRoutes = require("./routes/gameDataCollectRoutes");
const gameDataRoutes = require("./routes/gameDataRoutes");
const roomRoutes = require("./routes/roomRoutes");
const requestCounterRoutes = require("./routes/requestCounterRoute");
const checkAuthRoutes = require("./routes/checkAuthRoutes");
const socketHandler = require("./sockets/socketHandler");
const chatRoutes = require("./routes/chatRoutes");
const allowedOrigins = [
  "https://www.odd2tips.com",
  "https://odd2tips.com",
  "http://localhost:3000",
  "https://odd2tips.vercel.app",
  "https://odd2tips.onrender.com",
  "https://accounts.google.com",
];
const io = require("socket.io")(http, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

app.use(express.static("public"));
app.set("view engine", "ejs");

connectDatabase();
app.use("/api/auth", authRoutes);
app.use("/", googleAuth);
app.use("/api", AppController);

app.use("/api/blog", uploadRoutes);

app.use("/api/games", gameDataCollectRoutes);
app.use("/api/games", sportMonksRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api", requestCounterRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/scrapedData", scrapedDataRoutes);
app.use("/api/football", getResultsRoutes);
app.use("/api/football", getPredictionsRoutes);

const authenticate = require("./middleware/authenticate");
app.use("/api/games", authenticate, gameDataRoutes);

app.use("/api/auth", authenticate, checkAuthRoutes);

socketHandler(io);

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

const PORT = process.env.PORT || 8888;
http.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
