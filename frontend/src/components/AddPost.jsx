import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import AuthService from "./../services/AuthService";
import PostService from "./../services/PostService";

const AddPost = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [showTitleError, setShowTitleError] = useState(false);
    const [showBodyError, setShowBodyError] = useState(false);
    const [showLogError, setShowLogError] = useState(false);

    const handleTitleChange = (evt) => {
        evt.preventDefault();
        setTitle(evt.target.value);
    };

    const handleBodyChange = (evt) => {
        evt.preventDefault();
        setBody(evt.target.value);
    };

    const checkErrors = () => {
        const user = AuthService.getUserProfile();
        const errors = {};
        if (title === "") errors.title = true;
        if (body === "") errors.body = true;
        if (!user) errors.logIn = true;
        return new Promise((resolve, reject) =>
            Object.keys(errors).length === 0 ? resolve({ title: title, body: body, userId: user.id }) : reject(errors)
        );
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        setShowTitleError(false);
        setShowBodyError(false);
        setShowLogError(false);
        checkErrors()
            .then((res) => {
                setTitle("");
                setBody("");
                PostService.postPost(res.title, res.body, res.userId).then(console.log("POSTED"));
            })
            .catch((errors) => {
                if (errors.title) setShowTitleError(true);
                if (errors.body) setShowBodyError(true);
                if (errors.logIn) setShowLogError(true);
            });
    };

    //TODO update using validating on react-bootstrap: https://react-bootstrap.github.io/forms/validation/
    //try to add login check at them, old code:
    /**
     *  <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="titleGroup" as={Col} md="6">
                <Form.Label>Post Title</Form.Label>
                <InputGroup hasValidation>
                    <Form.Control type="text" placeholder="Title" required />
                    <Form.Control.Feedback type="invalid">Please insert a title.</Form.Control.Feedback>
                </InputGroup>
            </Form.Group>
            <Form.Group controlId="bodyGroup" className="mb-3">
                <Form.Label>Post Body</Form.Label>
                <Form.Control as="textarea" placeholder="Body" required rows={4} />
                <Form.Control.Feedback type="invalid">Please insert a body.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="handleLoginGroup" className="mb-3">
                <Form.Control plaintext readOnly defaultValue="" isInvalid={!loggedIn} />
                <Form.Control.Feedback type="invalid">You must be logged in to post.</Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
                Post!
            </Button>
        </Form>

        My login check now is very bad, i know
     */
    return (
        <Container>
            <Form noValidate onSubmit={handleSubmit}>
                <Form.Group controlId="titleGroup" as={Col} md="6">
                    <Form.Label>Post Title</Form.Label>
                    <Form.Control type="text" placeholder="Title" value={title} onChange={handleTitleChange} />
                    {showTitleError ? (
                        <Form.Text className="post-error-text">Please insert a title for your post.</Form.Text>
                    ) : null}
                </Form.Group>
                <Form.Group controlId="bodyGroup" className="mb-3">
                    <Form.Label>Post Body</Form.Label>
                    <Form.Control as="textarea" placeholder="Body" rows={4} value={body} onChange={handleBodyChange} />
                    {showBodyError ? (
                        <Form.Text className="post-error-text">Please insert a body for your post.</Form.Text>
                    ) : null}
                </Form.Group>
                {showLogError ? (
                    <Form.Group controlId="checkLoginGroup">
                        <Form.Text className="post-error-text">You must be logged in to post.</Form.Text>
                    </Form.Group>
                ) : null}
                <Button variant="primary" type="submit">
                    Post!
                </Button>
            </Form>
        </Container>
    );
};

export default AddPost;
