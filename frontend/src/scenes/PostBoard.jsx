import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";

import PostService from "./../services/PostService";
import Post from "../components/Post";

const PostBoard = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const updatePosts = (posts) => {
            setPosts(posts);
        };
        PostService.getPosts()
            .then((res) => {
                return res.json();
            })
            .then((jsonRes) => {
                updatePosts(jsonRes);
            });
    }, []);

    //  {posts.map((post) => (
    //      <Post key={post.id} title={post.title} body={post.body} userId={post.userId} />
    //  ))}

    return (
        <Container>
            {posts.map((post) => (
                <Post key={post.id} title={post.title} body={post.body} userId={post.userId} />
            ))}
        </Container>
    );
};

export default PostBoard;
