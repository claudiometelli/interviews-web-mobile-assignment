/**
 * @author Claudio Metelli
 */
import axios from "axios";

import endpoints from "../config/endpoints";

/**
 * PostService class provides services relating to posts across the frontend application
 * His function is to make call to the server relating to posts (/posts)
 * Every method of the class return a function and then, in the react component use promises (then() and catch())
 * Calls are defined in config/endpoint.js
 */
class PostService {
    getPosts = () => {
        return axios(endpoints.getPosts, {
            method: "GET",
            mode: "cors",
            headers: { "content-type": "application/json" },
        });
    };

    getRandomPosts = () => {
        return axios(endpoints.getRandomPosts, {
            method: "GET",
            mode: "cors",
            headers: { "content-type": "application/json" },
        });
    };

    getPostById = (postId) => {
        return axios(endpoints.getPostById.replace(":id", postId), {
            method: "GET",
            mode: "cors",
            headers: { "content-type": "application/json" },
        });
    };

    postPost = (title, body, userId) => {
        return axios(endpoints.postPost, {
            method: "POST",
            mode: "cors",
            data: {
                title: title,
                body: body,
                userId: userId,
            },
            headers: { "content-type": "application/json" },
        });
    };

    modifyPost = (postId, title, body) => {
        console.log(postId);
        return axios(endpoints.modifyPostById.replace(":id", postId), {
            method: "PUT",
            mode: "cors",
            data: {
                title: title,
                body: body,
            },
            headers: { "content-type": "application/json" },
        });
    };

    deletePost = (postId) => {
        return axios(endpoints.deletePostById.replace(":id", postId), {
            method: "DELETE",
            mode: "cors",
            headers: { "content-type": "application/json" },
        });
    };
}

const service = new PostService();
export default service;
