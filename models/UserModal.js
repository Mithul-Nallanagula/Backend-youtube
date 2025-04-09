import mongoose from "mongoose";

const usersechama = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password: {
        type: String,
        required: true
    },
    channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channels",
        default: null
    },
    subscribedChannels: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channels"
    }],
    likedVideos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Videos"
    }]
});

export const Users = mongoose.model("Users" , usersechama);