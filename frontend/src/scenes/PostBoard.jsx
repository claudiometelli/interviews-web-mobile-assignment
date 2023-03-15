import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";

import PostService from "./../services/PostService";
import Post from "../components/Post";

const PostBoard = () => {
    const [posts, setPosts] = useState([]);

    const deletePost = (postId) => {
        setPosts(posts.filter((post) => post.id !== postId));
    };

    useEffect(() => {
        PostService.getRandomPosts().then((res) => {
            setPosts(res.data);
        });
    }, []);

    return (
        <Container>
            {posts.map((post) => (
                <Post
                    key={post.id}
                    postId={post.id}
                    title={post.title}
                    body={post.body}
                    userId={post.userId}
                    deletePost={deletePost}
                />
            ))}
        </Container>
    );
};

export default PostBoard;
