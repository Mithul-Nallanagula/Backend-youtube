import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import videorouter from "./routes/videorutes.js";
import authrouter from "./routes/auth.js";
import channelrote from "./routes/channelroute.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// CORS configuration to allow both localhost and production URLs
const corsOptions = {
  origin: ["http://localhost:5173", "https://youtube-frontend-plum.vercel.app"], // Add both frontend URLs
  methods: "GET,POST,PUT,DELETE",
  credentials: true, // Allow credentials (cookies, etc.)
};

app.use(cors(corsOptions));  // Apply the CORS options to your app

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use("/videos", videorouter);
app.use("/auth", authrouter);
app.use("/channel", channelrote);

console.log("Server is running on port " + process.env.MONGO_URI);

