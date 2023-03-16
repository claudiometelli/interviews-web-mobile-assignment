export const serverUrl = "http://localhost:8080";

const endpoints = {
    getUsers: `${serverUrl}/users`,
    getUserById: `${serverUrl}/users/:id`,
    getPosts: `${serverUrl}/posts`,
    postPost: `${serverUrl}/posts`,
    getRandomPosts: `${serverUrl}/posts?randomPosts=true`,
    getPostById: `${serverUrl}/posts/:id`,
    deletePostById: `${serverUrl}/posts/:id`,
    modifyPostById: `${serverUrl}/posts/:id`,
    getCommentsByPostId: `${serverUrl}/posts/:id/comments`,
    getComments: `${serverUrl}/comments`,
    getCommentsByQueryPostId: `${serverUrl}/comments?postId=:id`,
};

export default endpoints;
