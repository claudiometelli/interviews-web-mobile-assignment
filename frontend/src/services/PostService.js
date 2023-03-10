import endpoints from "../config/endpoints";

class PostService {
    getPosts = () => {
        return fetch(endpoints.getPosts, {
            method: "GET",
            mode: "cors",
            headers: { "content-type": "application/json" },
        });
    };

    getPostById = (postId) => {
        return fetch(endpoints.getPostById.replace(":id", postId), {
            method: "GET",
            mode: "cors",
            headers: { "content-type": "application/json" },
        });
    };
}

const service = new PostService();
export default service;
