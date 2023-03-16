/**
 * @author Claudio Metelli
 *
 * For more info about this API: https://jsonplaceholder.typicode.com/
 */
import express from "express";
import { body, validationResult } from "express-validator";
import config from "../config/config.js";
import { users, posts, comments } from "../database/dbReader.js";

/**
 * -- POST SCHEMA --
 *
 * {
 *      id: int,
 *      title: string,
 *      body: string,
 *      userId: int
 * }
 */

const router = express.Router();

/**
 * GET request on /posts
 * always takes a maximum of <config.maxPostsQuery> from db and returns
 *
 * query parameters:
 * random: takes random posts instead of the first n-posts
 * @return {Array} a list of posts inside res object
 */
router.get("/", (req, res) => {
    const randomPosts = req.query.randomPosts === "true" ? true : false;
    let result;
    if (randomPosts) {
        const randoms = [];
        // iterate till you have taken all the posts or till you reach <config.maxPostsQuery>
        while (randoms.length < Math.min(posts.data.length, config.maxPostsQuery)) {
            // generate random index between 0 and posts.length
            const nextEl = Math.floor(Math.random() * posts.data.length);
            if (!randoms.includes(nextEl)) randoms.push(nextEl);
        }
        // result is the random list
        result = randoms.map((randomIndex) => posts.data[randomIndex]);
    } else {
        // result are the first <config.maxPostsQuery> posts (or less, if there are not enough in database)
        result = posts.data.slice(0, config.maxPostsQuery);
    }
    return res.json(result);
});

/**
 * GET request on /posts/id
 * if post is not found, it returns a 404 error inside res object
 *
 * @return {Object} the post object with that id inside res object
 */
router.get("/:id", (req, res) => {
    const postId = req.params.id;
    const result = posts.data.find((post) => post.id == postId);
    if (result === undefined) {
        return res.status(404).send("Post not Found");
    }
    return res.json(result);
});

/**
 * GET request on /posts/id/comments
 * if post is not found, it returns a 404 error inside res object
 *
 * @return {Array} a list of post comments inside res object
 */
router.get("/:id/comments", (req, res) => {
    const postId = req.params.id;
    if (posts.data.filter((post) => post.id == postId).length === 0) {
        return res.status(404).send("Post not Found");
    }
    const result = comments.data.filter((comment) => comment.postId == postId);
    return res.json(result);
});

/**
 * POST request on /posts
 * if data format is wrong (see post schema), it returns a 400 error
 * if user is not found, it return a 404 error inside res object
 *
 * @return {Object} the post created with 201 code inside res object
 */
router.post(
    "/",
    body("title").notEmpty().isString(),
    body("body").notEmpty().isString(),
    body("userId").isInt(),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send("Bad request");
        }
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
        return res.status(201).json(post);
    }
);

/**
 * PUT request on /posts/id
 * if data format is wrong (see post schema), it returns a 400 error
 * if post is not found, it return a 404 error inside res object
 *
 * @return {Object} 204 code inside res object
 */
router.put("/:id", body("title").notEmpty().isString(), body("body").notEmpty().isString(), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send("Bad request");
    }
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

/**
 * PATCH request on /posts/id
 * if data format is wrong (see post schema), it returns a 400 error
 * if post is not found, it return a 404 error inside res object
 *
 * @return {Object} 204 code inside res object
 */
router.patch("/:id", body("title").notEmpty().isString(), body("body").notEmpty().isString(), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send("Bad request");
    }
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

/**
 * DELETE request on /posts/id
 * if post is not found, it return a 404 error inside res object
 *
 * @return {Object} 204 code inside res object
 */
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
