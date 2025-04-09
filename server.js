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
app.get('/', (req, res) => {
    res.send('API is running ');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} `);
});

app.use("/videos" , videorouter);
app.use("/auth"  , authrouter)
app.use("/channel" , channelrote)




