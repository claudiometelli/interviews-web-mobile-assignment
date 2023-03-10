import axios from "axios";

import endpoints from "../config/endpoints";

class PostService {
    getPostById = (postId) => {
        return axios.get(endpoints.getPostById.replace(":id", postId));
    };
}

const service = new PostService();
export default service;
