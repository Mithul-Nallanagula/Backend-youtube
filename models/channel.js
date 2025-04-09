import mongoose from "mongoose";
const channelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    logoUrl: {
        type: String,
        default: "https://d4l6e04z43qjx.cloudfront.net/img/youtube-logo/youtube-logo-20.png"
    },
    bannerUrl: {
        type: String,
        default: "https://img.pikbest.com/origin/10/51/13/94SpIkbEsTQnz.jpg!w700wp"

    }
    ,
    subscribers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }],
    videos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Videos"
    }],
});

const Channels = mongoose.model('Channels', channelSchema);
 export default Channels