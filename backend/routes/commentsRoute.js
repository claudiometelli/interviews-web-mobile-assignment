import express from "express";
import { posts, comments } from "../database/dbReader.js";

const router = express.Router();

router.get("/", (req, res) => {
    const postId = req.query.postId;
    if (posts.data.filter((post) => post.id == postId).length === 0) {
        res.status(404);
        res.send("Post not Found");
    }
    const result = comments.data.filter((comment) => comment.postId == postId);
    res.json(result);
});

export default router;
