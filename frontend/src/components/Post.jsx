import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";

import UserService from "./../services/UserService";

const Post = (props) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const updateUser = (user) => {
            setUser(user);
        };
        UserService.getUserById(props.userId).then((res) => {
            updateUser(res.data);
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
        <Container>
            <Row>
                <Col md={11}>
                    <Row>
                        <Col>
                            <h2 className={"post-title"}>{props.title}</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h5>by {`${user.username}`}</h5>
                        </Col>
                    </Row>
                </Col>
                <Col md="auto">
                    <Dropdown>
                        <Dropdown.Toggle variant="outline-secondary" size="sm" />

                        <Dropdown.Menu>
                            <Dropdown.Item>Delete</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
            <Row>
                <Col md={11}>
                    <p className="post-body">{props.body}</p>
                </Col>
            </Row>
        </Container>
    );
};

export default Post;
