import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import videorouter from "./routes/videorutes.js";
import authrouter from "./routes/auth.js";
import channelrote from "./routes/channelroute.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // Use default port 5000 if not specified

// CORS configuration
const corsOptions = {
  origin: 'https://youtube-frontend-plum.vercel.app', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Methods allowed
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions)); // Use the CORS options

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Routing
app.use("/videos", videorouter);
app.use("/auth", authrouter);
app.use("/channel", channelrote);
