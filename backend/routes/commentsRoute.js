/**
 * @author Claudio Metelli
 *
 * For more info about this API: https://jsonplaceholder.typicode.com/
 */
import express from "express";

import config from "../config/config.js";
import { posts, comments } from "../database/dbReader.js";

/**
 * {
 *      id: int,
 *      name: string,
 *      email: email-string,
 *      body: string,
 *      postId: int
 * }
 */
const router = express.Router();

/**
 * GET request on /comments
 * always takes a maximum of <config.maxCommentsQuery> from db and returns
 *
 * query parameters:
 * postId: filter by post
 *
 * @return {Array} a list of comments inside res object
 */
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
