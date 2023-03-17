import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import Form from "react-bootstrap/Form";

import PostService from "./../services/PostService";

/**
 * A component built to modify posts.
 * You need be the author of the post to modify it,
 * otherwise you won't get that options in the dropdown menu in components/Post.
 * Title and Body are transformed in input-text and input-textarea with their initial values.
 * To update your post Title and Body cannot be empty.
 * When an error is found, the rispective show<Title,Body>Error variable is updated and it shows the error.
 * If there are no errors, you can see the post on the screen in scenes/PostBoard, using the props.addPostFunction
 *
 * @param {*} props {
 *                      postId: the id of the post
 *                      title: title of the post
 *                      body: body of the post
 *                      userId: the id of the user who created the post
 *                      close: a callback function from scenes/PostBoard called when you close this component
 *                  }
 */
const ModifyPost = (props) => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [showTitleError, setShowTitleError] = useState(false);
    const [showBodyError, setShowBodyError] = useState(false);

    const handleTitleChange = (evt) => {
        evt.preventDefault();
        setTitle(evt.target.value);
    };

    const handleBodyChange = (evt) => {
        evt.preventDefault();
        setBody(evt.target.value);
    };

    const handleCloseButton = (evt) => {
        evt.preventDefault();
        props.close();
    };

    const checkErrors = () => {
        const errors = {};
        if (title === "") errors.title = true;
        if (body === "") errors.body = true;
        return new Promise((resolve, reject) =>
            Object.keys(errors).length === 0 ? resolve({ title: title, body: body }) : reject(errors)
        );
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        setShowTitleError(false);
        setShowBodyError(false);
        checkErrors()
            .then((res) => {
                setTitle(res.title);
                setBody(res.body);
                PostService.modifyPost(props.postId, res.title, res.body)
                    .then(() => console.log("MODIFIED"))
                    .catch((error) => {
                        if (error.status.code === 400) console.error("The format of your request is wrong");
                        if (error.status.code === 404)
                            console.error("The post you are trying to delete doesn't exist.");
                    });
            })
            .catch((errors) => {
                if (errors.title) setShowTitleError(true);
                if (errors.body) setShowBodyError(true);
            });
    };

    useEffect(() => {
        setTitle(props.title);
        setBody(props.body);
    }, [props.title, props.body]);

    return (
        <Container className="mt-2">
            <Row>
                <Col>
                    <Container className="d-flex justify-content-end close-button pt-2">
                        <CloseButton onClick={handleCloseButton} />
                    </Container>
                </Col>
                <Col md={11}>
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group controlId="titleGroup" as={Col} className="md-6">
                            <Form.Label>Change Title</Form.Label>
                            <Form.Control type="text" placeholder="Title" value={title} onChange={handleTitleChange} />
                            {showTitleError ? (
                                <Form.Text className="post-error-text">Please insert a title for your post.</Form.Text>
                            ) : null}
                        </Form.Group>
                        <Form.Group controlId="bodyGroup" className="mb-3">
                            <Form.Label>Change Body</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Body"
                                rows={4}
                                value={body}
                                onChange={handleBodyChange}
                            />
                            {showBodyError ? (
                                <Form.Text className="post-error-text">Please insert a body for your post.</Form.Text>
                            ) : null}
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Modify
                        </Button>
                    </Form>
                </Col>
            </Row>
            <hr className="rounded"></hr>
        </Container>
    );
};

export default ModifyPost;
