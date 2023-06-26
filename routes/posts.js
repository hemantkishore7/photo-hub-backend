import express from "express";
import {verifyToken} from "../middleware/auth.js";
import {
    addComment,
    getFeedPosts,
    getUserPosts,
    likePost,
} from "../controllers/posts.js"

const router = express.Router();

//Read
router.get("/",verifyToken,getFeedPosts)
router.get("/:userId/posts",verifyToken,getUserPosts)

//Update 
router.patch("/:id/like",verifyToken,likePost)
router.put("/:id/comment",verifyToken,addComment)

export default router;