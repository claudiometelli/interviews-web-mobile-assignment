export const serverUrl = "http://localhost:8080";

const endpoints = {
    getPosts: `${serverUrl}/posts`,
    getPostById: `${serverUrl}/posts/:id`,
    getCommentsByPostId: `${serverUrl}/posts/:id/comments`,
    getComments: `${serverUrl}/comments`,
    getCommentsByQueryPostId: `${serverUrl}/comments?postId=:id`,
};

export default endpoints;
