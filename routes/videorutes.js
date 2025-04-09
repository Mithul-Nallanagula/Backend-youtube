import express from "express";
import { getallvideo , getvideo ,uploadvideo ,likevideoController,deleteCommentController,updateCommentController , addCommentController } from "../controller/videoController.js";

const videorouter = express.Router();

videorouter.get('/video', getallvideo);
videorouter.post('/video', uploadvideo );
videorouter.get('/video/:id', getvideo);
videorouter.put('/like/:vid/:uid', likevideoController);
videorouter.post('/comment/:vid/:uid', addCommentController);
videorouter.delete('/comment/delete/:vid/:comid', deleteCommentController);
videorouter.put('/comment/update/:cid', updateCommentController);

console.log(getallvideo)
export default videorouter