import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
import http from "http";
import cors from "cors";
app.use(cors());
app.use(cookieParser());
import connectDatabase from "./utils/database.mjs";
import authRoutes from "./routes/authRoute.mjs";
import googleAuth from "./routes/googleAuth.mjs";
import uploadRoutes from "./routes/uploadRoutes.mjs";
import blogRoutes from "./routes/blogRoutes.mjs";
import sportMonksRoutes from "./routes/sportMonksRoute.mjs";
import scrapedDataRoutes from "./routes/scrapedDataRoutes.mjs";
import getResultsRoutes from "./routes/getResultsRoutes.mjs";
import getPredictionsRoutes from "./routes/getPredictionsRoutes.mjs";
import getFootballFixturesRoutes from "./routes/getFootballFixturesRoutes.mjs";
import historyRoutes from "./routes/historyRoutes.mjs";
import AppController from "./routes/appRoutes.mjs";
import markdownToHtmlRoutes from "./routes/markdownToHtmlRoutes.mjs";
import gameDataCollectRoutes from "./routes/gameDataCollectRoutes.mjs";
import gameDataRoutes from "./routes/gameDataRoutes.mjs";
import analyzeResultsRoutes from "./routes/analyzeResultsRoutes.mjs";
import roomRoutes from "./routes/roomRoutes.mjs";
import requestCounterRoutes from "./routes/requestCounterRoute.mjs";
import checkAuthRoutes from "./routes/checkAuthRoutes.mjs";
import socketHandler from "./sockets/socketHandler.mjs";
import chatRoutes from "./routes/chatRoutes.mjs";
const allowedOrigins = [
  "https://www.odd2tips.com",
  "https://odd2tips.com",
  "http://localhost:3000",
  "https://odd2tips.vercel.app",
  "https://odd2tips.onrender.com",
  "https://accounts.google.com",
];

import { Server } from "socket.io";
import { createServer } from "http";
const server = createServer(app);
const io = new Server(server);

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
app.use("/api/football", getFootballFixturesRoutes);
app.use("/api/football", analyzeResultsRoutes);
app.use("/api/football", historyRoutes);
app.use("/api/markdown", markdownToHtmlRoutes);

import authenticate from "./middleware/authenticate.mjs";
app.use("/api/games", authenticate, gameDataRoutes);

app.use("/api/auth", authenticate, checkAuthRoutes);

socketHandler(io);

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
