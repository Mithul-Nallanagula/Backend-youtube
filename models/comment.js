
import mongoose from "mongoose";

let commentSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    user: {
        required: false,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    }
});

const Comments = mongoose.model('Comments', commentSchema);

export default Comments