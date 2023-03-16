import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import PostService from "./../services/PostService";
import Post from "../components/Post";
import AddPost from "../components/AddPost";
import ModifyPost from "../components/ModifyPost";

const PostBoard = () => {
    const [posts, setPosts] = useState([]);
    const [showAddPostComponent, setShowAddPostComponent] = useState(false);

    const openAddPostComponent = () => {
        setShowAddPostComponent(true);
    };

    const closeAddPostComponent = () => {
        setShowAddPostComponent(false);
    };

    const addPost = (post) => {
        setPosts([{ ...post, modify: false }, ...posts]);
    };

    const modifyPost = (postId) => {
        setPosts(
            posts.map((post) => {
                if (post.id === postId) {
                    post.modify = true;
                }
                return post;
            })
        );
    };

    const deletePost = (postId) => {
        setPosts(posts.filter((post) => post.id !== postId));
    };

    useEffect(() => {
        PostService.getRandomPosts().then((res) => {
            setPosts(
                res.data.map((post) => {
                    return { ...post, modify: false };
                })
            );
        });
    }, []);

    return (
        <Container>
            {showAddPostComponent ? <AddPost close={closeAddPostComponent} addPost={addPost} /> : null}
            {posts.map((post) => {
                let result;
                if (post.modify) {
                    result = (
                        <ModifyPost
                            key={post.id}
                            postId={post.id}
                            title={post.title}
                            body={post.body}
                            userId={post.userId}
                        />
                    );
                } else {
                    result = (
                        <Post
                            key={post.id}
                            postId={post.id}
                            title={post.title}
                            body={post.body}
                            userId={post.userId}
                            modifyPost={modifyPost}
                            deletePost={deletePost}
                        />
                    );
                }
                return result;
            })}
            <Button id="postButton" className="align-items-center" onClick={openAddPostComponent}>
                <i className="fa fa-plus"></i>
            </Button>
        </Container>
    );
};

export default PostBoard;
