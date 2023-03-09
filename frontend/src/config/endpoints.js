export const serverUrl = "http://localhost:8080";

const endpoints = {
    getPosts: `${serverUrl}/posts`,
    getPostById: `${serverUrl}/posts/:id`,
    getCommentsByPostId: `${serverUrl}/posts/:id/comments`,
    getComments
    getGame: `${serverUrl}/games/:id`,
    getGameStatus: `${serverUrl}/games/status`,
    connectGame: `${serverUrl}/games/connect`,
};

export default endpoints;
