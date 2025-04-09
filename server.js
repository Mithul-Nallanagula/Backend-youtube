import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";
import videorouter from "./routes/videorutes.js";
import authrouter from "./routes/auth.js";
import channelrote from "./routes/channelroute.js";
import cors from "cors";

dotenv.config();


const app = express();
const PORT = process.env.PORT;
app.use(express.json())
app.use(express.urlencoded({ extended: true })); 
app.use(cors())


 
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB connected");
})
.catch((err) => {
    console.log(err);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} `);
});

app.use("/videos" , videorouter);
app.use("/auth"  , authrouter)
app.use("/channel" , channelrote)




console.log("Mongo URI:", process.env.MONGO_URI);
