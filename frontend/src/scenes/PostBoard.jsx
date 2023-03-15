import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";

import PostService from "./../services/PostService";
import Post from "../components/Post";

const PostBoard = () => {
    const [posts, setPosts] = useState([]);

    const deletePost = (postId) => {
        const postIndex = posts.findIndex((post) => post.id === postId);
        if (postIndex !== -1) posts.splice(postIndex, 1);
    };

    useEffect(() => {
        PostService.getRandomPosts().then((res) => {
            setPosts(res.data);
        });
    }, []);

    return (
        <Container>
            {posts.map((post) => (
                <Post key={post.id} title={post.title} body={post.body} userId={post.userId} delete={deletePost} />
            ))}
        </Container>
    );
};

export default PostBoard;
