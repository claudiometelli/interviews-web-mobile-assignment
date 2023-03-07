import express from "express";
import { posts } from "../database/dbReader.js";

const router = express.Router();

router.get("/", (req, res) => {
    console.log(posts);
    // res.json(db.data.posts);
});

router.get("/:id", (req, res) => {
    const postId = req.params.id;
    const result = posts.data.find((post) => post.id == postId);
    if (result === undefined) {
        res.status(404);
        res.send("Post not Found");
    }
    res.json(result);
});

export default router;
