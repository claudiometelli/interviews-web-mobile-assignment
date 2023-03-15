import axios from "axios";
import endpoints from "../config/endpoints";

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

    deletePost = () => {
        return axios(endpoints.deletePost, {
            method: "DELETE",
            mode: "cors",
            headers: { "content-type": "application/json" },
        });
    };
}

const service = new PostService();
export default service;
