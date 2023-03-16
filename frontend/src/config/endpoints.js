const serverUrl = "http://localhost:8080";

// Endpoints of the server
// Use these URLs to make call to the server
// These URLs are used by services
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
