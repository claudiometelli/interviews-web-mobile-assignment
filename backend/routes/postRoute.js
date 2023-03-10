import express from "express";
import config from "../config/config.js";
import { users, posts, comments } from "../database/dbReader.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.json(posts.data.slice(0, config.maxPostsQuery));
});

router.get("/:id", (req, res) => {
    const postId = req.params.id;
    const result = posts.data.find((post) => post.id == postId);
    if (result === undefined) {
        return res.status(404).send("Post not Found");
    }
    res.json(result);
});

router.get("/:id/comments", (req, res) => {
    const postId = req.params.id;
    if (posts.data.filter((post) => post.id == postId).length === 0) {
        return res.status(404).send("Post not Found");
    }
    const result = comments.data.filter((comment) => comment.postId == postId);
    res.json(result);
});

router.post("/", (req, res) => {
    const postTitle = req.body.title;
    const postBody = req.body.body;
    const postUser = req.body.userId;
    if (users.data.filter((user) => user.id == postUser).length === 0) {
        return res.status(404).send("User not Found");
    }
    const maxId = posts.data.length ? Math.max(...posts.data.map((post) => post.id)) : 0;
    const post = {
        userId: postUser,
        id: maxId + 1,
        title: postTitle,
        body: postBody,
    };
    posts.data.push(post);
    posts.write();
    res.status(201).send("Post succesfully created");
});

router.put("/:id", (req, res) => {
    const postId = req.params.id;
    const postTitle = req.body.title;
    const postBody = req.body.body;
    if (posts.data.filter((post) => post.id == postId).length === 0) {
        return res.status(404).send("Post not Found");
    }
    posts.data.map((post) => {
        if (post.id == postId) {
            post.title = postTitle;
            post.body = postBody;
        }
    });
    posts.write();
    res.status(204).send();
});

router.patch("/:id", (req, res) => {
    const postId = req.params.id;
    const postTitle = req.body.title;
    const postBody = req.body.body;
    if (posts.data.filter((post) => post.id == postId).length === 0) {
        return res.status(404).send("Post not Found");
    }
    posts.data.map((post) => {
        if (post.id == postId) {
            if (postTitle) post.title = postTitle;
            if (postBody) post.body = postBody;
        }
    });
    posts.write();
    res.status(204).send();
});

router.delete("/:id", (req, res) => {
    const postId = req.params.id;
    const postIndex = posts.data.findIndex((post) => post.id == postId);
    if (postIndex === -1) {
        return res.status(404).send("Post not Found");
    }
    posts.data.splice(postIndex, 1);
    posts.write();
    res.status(204).send();
});

export default router;
