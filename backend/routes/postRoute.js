import express from "express";
import { posts, comments } from "../database/dbReader.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.json(posts.data);
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

router.get("/:id/comments", (req, res) => {
    const postId = req.params.id;
    if (posts.data.filter((post) => post.id == postId).length === 0) {
        res.status(404);
        res.send("Post not Found");
    }
    const result = comments.data.filter((comment) => comment.postId == postId);
    res.json(result);
});

router.post("/", (req, res) => {
    const postTitle = req.body.title;
    const postBody = req.body.body;
    const postUser = req.body.user;
    const maxId = posts.data.length ? Math.max(...posts.data.map((post) => post.id)) : 0;
    const post = {
        userId: postUser,
        id: maxId + 1,
        title: postTitle,
        body: postBody,
    };
    posts.data.push(post);
    posts.write();
    res.json(post);
});

export default router;
