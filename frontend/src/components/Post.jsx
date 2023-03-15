import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";

import AuthService from "./../services/AuthService";
import PostService from "./../services/PostService";
import UserService from "./../services/UserService";

const selfDropdownTag = "SELF";
const otherDropdownTag = "OTHER";

const Post = (props) => {
    const [postUser, setPostUser] = useState({});
    const [showDropdown, setShowDropdown] = useState("");

    const SelfPostDropdown = () => {
        return (
            <Dropdown>
                <Dropdown.Toggle variant="outline-secondary" size="sm" />
                <Dropdown.Menu>
                    <Dropdown.Item as="button" onClick={handleDelete}>
                        Delete
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => console.log("Una bella busta di patatine rustiche")}>
                        Boost
                    </Dropdown.Item>
                    <Dropdown.Item>Altre diavolerie...</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );
    };

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

    const handleDelete = (evt) => {
        evt.preventDefault();
        PostService.deletePost().then(() => {});
    };

    useEffect(() => {
        const user = AuthService.getUserProfile();
        UserService.getUserById(props.userId).then((res) => {
            setPostUser(res.data);
            if (user && res.data.id === user.id) {
                setShowDropdown(selfDropdownTag);
            } else {
                setShowDropdown(otherDropdownTag);
            }
        });
    }, [props.userId]);

    /**
    * 
        <Card>
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                </Card.Text>
            </Card.Body>
        </Card>
    */

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
