import express from "express";
import { CreateChannel , findChannel , Subscribed , unsubscribe } from "../controller/channelcontroller.js";

const channelrote = express.Router()

channelrote.post("/create" , CreateChannel);
channelrote.post("/find/:id" , findChannel);
channelrote.put("/subscribe/:cid/:uid" , Subscribed);
channelrote.put("/unsubscribe/:cid/:uid" , unsubscribe)

export default channelrote