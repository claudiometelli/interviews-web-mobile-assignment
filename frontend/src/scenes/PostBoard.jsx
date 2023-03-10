import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";

import PostService from "./../services/PostService";
import Post from "../components/Post";

const PostBoard = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        PostService.getPosts().then((res) => {
            setPosts(
                res.data.map((post) => <Post key={post.id} user={post.userId} title={post.title} body={post.body} />)
            );
        });
    }, []);

    return <Container>{posts}</Container>;
};

export default PostBoard;
