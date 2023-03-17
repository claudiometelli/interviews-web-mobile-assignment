/**
 * @author Claudio Metelli
 */
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";

import AuthService from "./../services/AuthService";
import PostService from "./../services/PostService";
import UserService from "./../services/UserService";

// these tag are used to recognize user's posts, so you can show proper dropdown menu with proper actions.
const selfDropdownTag = "SELF";
const otherDropdownTag = "OTHER";

/**
 * A component which represents the post and its data
 * You can do different actions if you are the author of the post or if you are not
 *
 * @param {*} props {
 *                      postId: the id of the post
 *                      title: title of the post
 *                      body: body of the post
 *                      userId: the id of the user who created the post
 *                      modifyPost: a callback function to update the post if you want to modify it
 *                      deletePost: a callback function to delete the post if you want to delete it
 *                  }
 */
const Post = (props) => {
    const [postUser, setPostUser] = useState({});
    const [showDropdown, setShowDropdown] = useState("");

    const handleModify = (evt) => {
        evt.preventDefault();
        props.modifyPost(props.postId);
    };

    const handleDelete = (evt) => {
        evt.preventDefault();
        PostService.deletePost(props.postId)
            .then(() => {
                props.deletePost(props.postId);
            })
            .catch((error) => {
                if (error.status.code === 404) console.error("The post you are trying to delete doesn't exist.");
            });
    };

    useEffect(() => {
        const user = AuthService.getUserProfile();
        UserService.getUserById(props.userId)
            .then((res) => {
                setPostUser(res.data);
                // choose what type of dropdown to show, if you are the user or you are not the user
                if (user && res.data.id === user.id) {
                    setShowDropdown(selfDropdownTag);
                } else {
                    setShowDropdown(otherDropdownTag);
                }
            })
            .catch((error) => {
                if (error.status.code === 404) console.error("The user is not found");
            });
    }, [props.userId]);

    // dropdown to show if you are the author of the post
    const SelfPostDropdown = () => {
        return (
            <Dropdown>
                <Dropdown.Toggle variant="outline-secondary" size="sm" />
                <Dropdown.Menu>
                    <Dropdown.Item as="button" onClick={handleModify}>
                        Modify
                    </Dropdown.Item>
                    <Dropdown.Item as="button" onClick={handleDelete}>
                        Delete
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => console.log("Una bel pacchetto di patatine rustiche, grazie.")}>
                        Boost
                    </Dropdown.Item>
                    <Dropdown.Item>Altre diavolerie...</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );
    };

    // dropdown to show if you are not the author of the post
    const OtherPostDropdown = () => {
        return (
            <Dropdown>
                <Dropdown.Toggle variant="outline-secondary" size="sm" />
                <Dropdown.Menu>
                    <Dropdown.Item>Signal</Dropdown.Item>
                    <Dropdown.Item>Altre diavolerie...</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );
    };

    return (
        <Container className="mt-2">
            <Row>
                <Col md={11}>
                    <Row>
                        <Col>
                            <h2 className={"post-title"}>{props.title}</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h5>by {`${postUser.username}`}</h5>
                        </Col>
                    </Row>
                </Col>
                <Col md="auto">
                    {showDropdown === selfDropdownTag ? (
                        <SelfPostDropdown />
                    ) : showDropdown === otherDropdownTag ? (
                        <OtherPostDropdown />
                    ) : null}
                </Col>
            </Row>
            <Row>
                <Col md={11}>
                    <p className="post-body">{props.body}</p>
                </Col>
            </Row>
            <hr className="rounded"></hr>
        </Container>
    );
};

export default Post;
