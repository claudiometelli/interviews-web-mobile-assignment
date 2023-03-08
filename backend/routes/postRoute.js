import express from "express";
import { users, posts, comments } from "../database/dbReader.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.json(posts.data);
});

router.get("/:id", (req, res) => {
    const postId = req.params.id;
    const result = posts.data.find((post) => post.id == postId);
    if (result === undefined) {
        res.status(404).send("Post not Found");
    }
    res.json(result);
});

router.get("/:id/comments", (req, res) => {
    const postId = req.params.id;
    if (posts.data.filter((post) => post.id == postId).length === 0) {
        res.status(404).send("Post not Found");
    }
    const result = comments.data.filter((comment) => comment.postId == postId);
    res.json(result);
});

router.post("/", (req, res) => {
    const postTitle = req.body.title;
    const postBody = req.body.body;
    const postUser = req.body.user;
    if (users.data.filter((user) => user.id == postUser).length === 0) {
        res.status(404).send("User not Found");
    }
    const maxId = posts.data.length ? Math.max(...posts.data.map((post) => post.id)) : 0;
    const post = {
        userId: postUser,
        id: maxId + 1,
        title: postTitle,
        body: postBody,
    };
    posts.data.push(post);
    posts
        .write()
        .then(res.status(201).send("Post succesfully created"))
        .catch((error) => console.error(`An error has occurred:${error}`));
});

router.put("/:id", (req, res) => {
    const postId = req.params.id;
    const postTitle = req.body.title;
    const postBody = req.body.body;
    if (posts.data.filter((post) => post.id == postId).length === 0) {
        res.status(404).send("Post not Found");
    }
    posts.data.map((post) => {
        if (post.id == postId) {
            post.title = postTitle;
            post.body = postBody;
        }
    });
    posts
        .write()
        .then(res.status(204).send())
        .catch((error) => console.error(`An error has occurred:${error}`));
});

router.patch("/:id", (req, res) => {
    const postId = req.params.id;
    const postTitle = req.body.title;
    const postBody = req.body.body;
    if (posts.data.filter((post) => post.id == postId).length === 0) {
        res.status(404).send("Post not Found");
    }
    posts.data.map((post) => {
        if (post.id == postId) {
            if (postTitle) post.title = postTitle;
            if (postBody) post.body = postBody;
        }
    });
    posts
        .write()
        .then(res.status(204).send())
        .catch((error) => console.error(`An error has occurred:${error}`));
});

export default router;
