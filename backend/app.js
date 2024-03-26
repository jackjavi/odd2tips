require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());
const http = require("http").createServer(app);
const cors = require("cors");
app.use(cors());
const connectDatabase = require("./utils/database");
const authRoutes = require("./routes/authRoute");
const uploadRoutes = require("./routes/uploadRoutes");
const blogRoutes = require("./routes/blogRoutes");
const sportMonksRoutes = require("./routes/sportMonksRoute");
const AppController = require("./routes/appRoutes");
const socketHandler = require("./sockets/socketHandler");
const chatRoutes = require("./routes/chatRoutes");
const allowedOrigins = ["http://localhost:3000", "https://odd2tips.vercel.app"];
const io = require("socket.io")(http, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.static("public"));

connectDatabase();
app.use("/api/auth", authRoutes);
app.use("/api", AppController);
app.use("/api/chat", chatRoutes);
app.use("/api/blog", uploadRoutes);
app.use("/api/blog", blogRoutes);

const authenticate = require("./middleware/authenticate");
app.use("/api/", authenticate, sportMonksRoutes);

socketHandler(io);

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

const PORT = process.env.PORT || 8888;
http.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
