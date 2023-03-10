import express from "express";

import config from "../config/config.js";
import { posts, comments } from "../database/dbReader.js";

const router = express.Router();

router.get("/", (req, res) => {
    const postId = req.query.postId;
    let result = comments.data;
    if (postId) {
        if (posts.data.filter((post) => post.id == postId).length === 0) {
            return res.status(404).send("Post not Found");
        }
        result = result.filter((comment) => comment.postId == postId);
    }
    if (result.length > config.maxCommentsQuery) result = result.slice(0, config.maxCommentsQuery);
    res.json(result);
});

export default router;
