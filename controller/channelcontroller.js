import { model } from "mongoose";
import Channels from "../models/channel.js";
import { Users } from "../models/UserModal.js";
import jwt from "jsonwebtoken";

export const CreateChannel = (req ,res) => {
    const {name , logo , banner } = req.body;
    const token = req.headers.authorization.split(" ")[1];

    let verify;
try {
    verify = jwt.verify(token, process.env.JWT_SECRET);
} catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
}

    if(!verify){
        res.status(400).json({success:false , message:"Token Expired!!"})
    }

    Users.findOne({email:verify.email}).then((user) => {
        if(!user){
            return res.status(400).json({success:false, message:"User Not Found!!"})
        }

        const newuser = new Channels({
            name,
            logoUrl : logo ,
            bannerUrl : banner
        })

        user.channel = newuser._id;

        return newuser.save()
         .then(() => user.save())
         .then(() => {
            res.status(200).json({ success: true, message: "Channel created" });
        });
    })
    .catch((err) => {
        res.status(500).json({ success: false, message: "Failed to create channel", error: err.message });
    })
    
 }

 export const findChannel = (req, res) => {
    const { id } = req.params

    Channels.findOne({ _id: id }).populate({
        path: "videos",
        populate: {
            path: "channelId",
            model: "Channels"
        }
    }).then((channel) => {
        if (!channel) {
            return res.status(400).json({ success: false, message: "Channel Not Found!!" }); // ✅ return here
        }

        res.status(200).json({ success: true, message: "Channel Found!!", channel });
    }).catch((error) => {
        res.status(400).json({
            success: false,
            message: error.message || "Failed to fetch channel"
        });
    });
};
 export const Subscribed = (req, res) => {
    const { cid, uid } = req.params;

    Users.findById(uid)
        .then((user) => {
            if (!user) {
                return res.status(400).json({ success: false, message: "User Not Found!!" });
            }

            return Channels.findById(cid)
                .then((channel) => {
                    if (!channel) {
                        return res.status(404).json({ success: false, message: "Channel not found" });
                    }

                    // 🔍 Check if already subscribed
                    if (channel.subscribers.includes(user._id)) {
                        return res.status(400).json({ success: false, message: "Already subscribed" });
                    }

                    // ✅ Add subscription
                    channel.subscribers.push(user._id);
                    user.subscribedChannels.push(channel._id);

                    return channel.save()
                        .then(() => user.save())
                        .then(() => {
                            return res.status(200).json({ success: true, message: "Subscribed successfully" });
                        });
                });
        })
        .catch((err) => res.status(500).json({ success: false, message: "Error finding user or channel", err }));
};




   

export const unsubscribe = (req, res) => {
    const { cid, uid } = req.params; // Channel ID (cid) and User ID (uid)

    Users.findById(uid)
        .then((user) => {
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            Channels.findById(cid)
                .then((channel) => {
                    if (!channel) {
                        return res.status(404).json({ success: false, message: "Channel not found" });
                    }

                    // Remove user from the channel's subscribers list
                    channel.subscribers = channel.subscribers.filter(sub => sub.toString() !== user._id.toString());

                    // Remove channel from user's subscribed channels list
                    user.subscribedChannels = user.subscribedChannels.filter(sub => sub.toString() !== channel._id.toString());

                    // Save the updated user and channel
                    channel.save()
                        .then(() => {
                            return user.save();
                        })
                        .then(() => {
                            return res.status(200).json({ success: true, message: "Unsubscribed successfully" });
                        })
                        .catch((err) => res.status(500).json({ success: false, message: "Failed to save changes", err }));
                })
                .catch((err) => res.status(500).json({ success: false, message: "Error finding channel", err }));
        })
        .catch((err) => res.status(500).json({ success: false, message: "Error finding user", err }));
};