import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import Navbar from "../components/Navbar";
import PostBoard from "./PostBoard";

//post button sta in piedi ma nemmeno lui sa
const Home = () => {
    return (
        <Container fluid>
            <Navbar />
            <Container>
                <Row className="justify-content-md-center">
                    <Col xs lg="2" style={{ backgroundColor: "green" }}>
                        Colonna di Sinistra
                    </Col>
                    <Col style={{ backgroundColor: "lightgrey" }}>
                        <PostBoard />
                    </Col>
                    <Col xs lg="2" style={{ backgroundColor: "green" }}>
                        Colonna di Destra
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col style={{ backgroundColor: "cyan" }}>Colonna 1</Col>
                    <Col md="auto" style={{ backgroundColor: "yellow" }}>
                        Colonna 2
                    </Col>
                    <Col style={{ backgroundColor: "cyan" }}>Colonna 3</Col>
                </Row>
            </Container>
            <Button id="postButton" className="align-items-center">
                <i className="fa fa-plus"></i>
            </Button>
        </Container>
    );
};

export default Home;
