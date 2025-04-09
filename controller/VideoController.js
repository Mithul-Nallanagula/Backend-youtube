import Comments from "../models/comment.js";
import Channels from "../models/channel.js";
import { Users } from "../models/UserModal.js";
import Videos from "../models/VideoModel.js";
import jwt from "jsonwebtoken";


export const getallvideo = (req, res) => {
    Videos.find().then((videos) => {
        res.status(200).json({message:"Successfully Fetched", videos})
    }).catch((err) => {
        res.status(404).json({message:"Videos Not Found", err})
    })
}

export const uploadvideo = (req, res) => {
    const { title, videoUrl, thumbnailUrl, description, category } = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    // Videos.insertMany([
    //         ,
    //         {
    //             title: "Top 10 Gaming Moments",
    //             thumbnailUrl: "https://i.ytimg.com/vi_webp/gWw23EYM9VM/maxresdefault.webp",
    //             description: "Highlights from the gaming world.",
    //             channelId: "channel_gaming_001",
    //             views: 8000,
    //             likes: 3000,
    //             dislikes: 200,
    //             uploadDate: new Date(),
    //             category: "Gaming",
    //             videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
    //         },
    //         {
    //             title: "Introduction to JavaScript",
    //             thumbnailUrl: "https://e7.pngegg.com/pngimages/250/264/png-transparent-education-background-with-teacher-chalkboard-thumbnail.png",
    //             description: "A complete beginner's guide to JavaScript.",
    //             channelId: "channel_js_001",
    //             views: 2500,
    //             likes: 1200,
    //             dislikes: 50,
    //             uploadDate: new Date(),
    //             category: "Javascript",
    //             videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
    //         },
    //         {
    //             title: "How to Ace Your Job Interview",
    //             thumbnailUrl: "https://img.jakpost.net/c/2019/09/03/2019_09_03_78912_1567484272._large.jpg",
    //             description: "Tips and tricks to succeed in job interviews.",
    //             channelId: "channel_job_001",
    //             views: 1000,
    //             likes: 600,
    //             dislikes: 20,
    //             uploadDate: new Date(),
    //             category: "Job",
    //             videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
    //         },
    //         {
    //             title: "Live Music Stream",
    //             thumbnailUrl: "https://i.ytimg.com/vi_webp/gWw23EYM9VM/maxresdefault.webp",
    //             description: "Enjoy live performances by top musicians.",
    //             channelId: "channel_music_001",
    //             views: 3000,
    //             likes: 1800,
    //             dislikes: 40,
    //             uploadDate: new Date(),
    //             category: "Live",
    //             videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
    //         },
    //         {
    //             title: "Relaxing Music Compilation",
    //             thumbnailUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/1200px-Big_Buck_Bunny_thumbnail_vlc.png",
    //             description: "A mix of relaxing music to help you unwind.",
    //             channelId: "channel_music_002",
    //             views: 7000,
    //             likes: 5000,
    //             dislikes: 10,
    //             uploadDate: new Date(),
    //             category: "Music",
    //             videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    //         },
    //         {
    //             title: "How to Learn Effectively",
    //             thumbnailUrl: "https://img.freepik.com/premium-psd/school-education-admission-youtube-thumbnail-web-banner-template_475351-451.jpg",
    //             description: "Tips and strategies to maximize learning.",
    //             channelId: "channel_education_001",
    //             views: 2000,
    //             likes: 1100,
    //             dislikes: 30,
    //             uploadDate: new Date(),
    //             category: "Education",
    //             videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
    //         },
    //         {
    //             title: "Best Software for Developers",
    //             thumbnailUrl: "https://img.jakpost.net/c/2019/09/03/2019_09_03_78912_1567484272._large.jpg",
    //             description: "A review of essential software for developers.",
    //             channelId: "channel_software_001",
    //             views: 1200,
    //             likes: 900,
    //             dislikes: 15,
    //             uploadDate: new Date(),
    //             category: "Software",
    //             videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
    //         },
    //         {
    //             title: "Web Development in 2024",
    //             thumbnailUrl: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20200214170056/Web-Thumbnail.jpg",
    //             description: "An overview of the latest trends in web development.",
    //             channelId: "channel_dev_001",
    //             views: 4500,
    //             likes: 3000,
    //             dislikes: 40,
    //             uploadDate: new Date(),
    //             category: "Development",
    //             videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
    //         },
    //         {
    //             title: "World Affairs Today",
    //             thumbnailUrl: "https://img.jakpost.net/c/2019/09/03/2019_09_03_78912_1567484272._large.jpg",
    //             description: "An analysis of the current world affairs.",
    //             channelId: "channel_world_001",
    //             views: 3000,
    //             likes: 1400,
    //             dislikes: 80,
    //             uploadDate: new Date(),
    //             category: "World Affairs",
    //             videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
    //         },
    //         {
    //             title: "Comedy Skits Compilation",
    //             thumbnailUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/1200px-Big_Buck_Bunny_thumbnail_vlc.png",
    //             description: "Laugh-out-loud skits from top comedians.",
    //             channelId: "channel_comedy_001",
    //             views: 6000,
    //             likes: 4000,
    //             dislikes: 50,
    //             uploadDate: new Date(),
    //             category: "Comedy",
    //             videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    //         },
    //         {
    //             title: "Investing in Stocks 101",
    //             thumbnailUrl: "https://i.ytimg.com/vi_webp/gWw23EYM9VM/maxresdefault.webp",
    //             description: "A beginner's guide to investing in the stock market.",
    //             channelId: "channel_stocks_001",
    //             views: 2000,
    //             likes: 1000,
    //             dislikes: 60,
    //             uploadDate: new Date(),
    //             category: "Stocks",
    //             videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
    //         },
    //         {
    //             title: "Java Programming for Beginners",
    //             thumbnailUrl: "https://thecodex.me/static/5c02153876c8f9c5740350364990a18a/ee604/Java_Thumbnail_java_875e0d6a31.png",
    //             description: "A comprehensive guide to learning Java programming.",
    //             channelId: "channel_java_001",
    //             views: 5000,
    //             likes: 2500,
    //             dislikes: 100,
    //             uploadDate: new Date(),
    //             category: "Java",
    //             videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
    //         },
    //         {
    //             title: "Watched Video Example",
    //             thumbnailUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/1200px-Big_Buck_Bunny_thumbnail_vlc.png",
    //             description: "A previously watched video about various topics.",
    //             channelId: "channel_watched_001",
    //             views: 1500,
    //             likes: 900,
    //             dislikes: 20,
    //             uploadDate: new Date(),
    //             category: "Watched",
    //             videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    //         }
    //     ])

    if (!token) {
        return res.status(401).json({ success: false, message: "No token provided" });
    }

    let verify;
    try {
        verify = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }

    Users.findOne({ email: verify.email }).then((user) => {
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found!" });
        }

        return Channels.findById(user.channel).then((channel) => {
            if (!channel) {
                return res.status(404).json({ success: false, message: "Channel not found!" });
            }

            // ✅ Create new video
            const newVideo = new Videos({
                title,
                videoUrl,
                thumbnailUrl,
                description,
                category,
                channelId: channel._id
            });

            channel.videos.push(newVideo._id);

            return Promise.all([newVideo.save(), channel.save()])
                .then(() => {
                    return res.status(200).json({ success: true, message: "Video uploaded successfully!" });
                })
                .catch((err) => {
                    return res.status(500).json({ message: "Failed to save video/channel", err });
                });
        });
    }).catch((err) => {
        console.error("Error processing request:", err);
        return res.status(500).json({ success: false, message: "Error processing request", err });
    });
};

export const getvideo = (req ,res) => {
      const { id } = req.params;
      Videos.findById(id)
      .populate({ path : "channelId"})
      .populate({
        path: 'comments',
        populate: {
            path: 'user',  
            populate: {
                path: 'channel'
            }
        }
    }) .then((video) => {
        if (!video) {
            return res.status(404).json({ success: false, message: "Video not found" });
        }

        
        let updatedViews = video.views + 1;
        Videos.findByIdAndUpdate(id, { views: updatedViews })
            .then(() => {
                res.status(200).json({
                    success: true,
                    message: "Video data fetched",
                    video
                });
            })
            .catch((err) => {
                res.status(500).json({ success: false, message: "Failed to update views", err });
            });

    })
    .catch((err) => {
        res.status(400).json({ success: false, message: "Failed to fetch video", err });
    });
};

      
export const likevideoController = (req, res) => {
    const { vid, uid } = req.params;

    Videos.findById(vid).then((video) => {
        if (!video) {
            return res.status(404).json({
                success: false,
                message: "Video not found"
            });
        }

        Users.findById(uid).then((user) => {
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            // Check if the user has already liked the video
            if (user.likedVideos.includes(video._id)) {
                // Unlike the video (remove from likedVideos and decrement likes)
                user.likedVideos = user.likedVideos.filter(v => v.toString() !== video._id.toString());
                video.likes = video.likes > 0 ? video.likes - 1 : 0;

                video.save().then(() => {
                    user.save().then(() => {
                        return res.status(200).json({
                            success: true,
                            message: "Video unliked successfully"
                        });
                    }).catch(err => {
                        res.status(500).json({ success: false, message: "Failed to save user data", err });
                    });
                }).catch(err => {
                    res.status(500).json({ success: false, message: "Failed to save video data", err });
                });

                return;
            }

            // Like the video (if not already liked)
            user.likedVideos.push(video._id);
            video.likes = video.likes + 1;

            video.save().then(() => {
                user.save().then(() => {
                    res.status(200).json({
                        success: true,
                        message: "Video liked successfully"
                    });
                }).catch(err => {
                    res.status(500).json({ success: false, message: "Failed to save user data", err });
                });
            }).catch(err => {
                res.status(500).json({ success: false, message: "Failed to save video data", err });
            });

        }).catch(err => {
            res.status(500).json({ success: false, message: "Error finding user", err });
        });

    }).catch(err => {
        res.status(500).json({ success: false, message: "Error finding video", err });
    });
};


export const addCommentController = (req, res) => {
    const { vid, uid } = req.params;
    let { comment } = req.body;
    comment = comment.toString();

    Videos.findById(vid).then((video) => {
        if (!video) {
            return res.status(404).json({
                success: false,
                message: "Video not found"
            });
        }

        Users.findById(uid).then((user) => {
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            // Create new comment
            const newComment = new Comments({
                text: comment,
                user: uid
            });

            // Push comment ID into the video's comments array
            video.comments.push(newComment._id);

            // Save the new comment
            newComment.save().then((savedComment) => {
                // Save updated video
                video.save().then(() => {
                    res.status(200).json({
                        success: true,
                        message: "Comment added successfully",
                        comment: savedComment
                    });
                }).catch(err => {
                    res.status(500).json({ success: false, message: "Failed to save video", err });
                });

            }).catch(err => {
                res.status(500).json({ success: false, message: "Failed to save comment", err });
            });

        }).catch(err => {
            res.status(500).json({ success: false, message: "Error finding user", err });
        });

    }).catch(err => {
        res.status(500).json({ success: false, message: "Error finding video", err });
    });
};

export const deleteCommentController = (req, res) => {
    const { vid, comid } = req.params;

    // Find the video by ID
    Videos.findById(vid).then((video) => {
        if (!video) {
            return res.status(404).json({
                success: false,
                message: "Video not found"
            });
        }

        // Find the comment by ID
        Comments.findById(comid).then((comment) => {
            if (!comment) {
                return res.status(404).json({
                    success: false,
                    message: "Comment not found"
                });
            }

            // Remove the comment from the video's comments array
            video.comments = video.comments.filter(commentId => commentId.toString() !== comid);

            // Delete the comment from the database
            Comments.findByIdAndDelete(comid).then(() => {
                // Save the updated video
                video.save().then(() => {
                    res.status(200).json({
                        success: true,
                        message: "Comment deleted successfully"
                    });
                }).catch(err => {
                    res.status(500).json({ success: false, message: "Failed to save video after deleting comment", err });
                });

            }).catch(err => {
                res.status(500).json({ success: false, message: "Failed to delete comment", err });
            });

        }).catch(err => {
            res.status(500).json({ success: false, message: "Error finding comment", err });
        });

    }).catch(err => {
        res.status(500).json({ success: false, message: "Error finding video", err });
    });
};


export const updateCommentController = (req, res) => {
    const { cid } = req.params;
    const { newcomment } = req.body;

    Comments.findByIdAndUpdate(cid, { text: newcomment })
        .then(() => {
            res.status(200).json({
                success: true,
                message: "Changes saved"
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: "Server error. Please try again later.",
                error: err
            });
        });
};