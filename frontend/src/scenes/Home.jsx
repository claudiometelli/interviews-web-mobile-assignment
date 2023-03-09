import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import Navbar from "../components/Navbar";

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
                        <Container>
                            <h2>temporibus sit alias delectus eligendi possimus magni</h2>
                            <p>
                                quo deleniti praesentium dicta non quod\naut est molestias\nmolestias et officia quis
                                nihil\nitaque dolorem quia
                            </p>
                        </Container>
                        <Container>
                            <h2>temporibus sit alias delectus eligendi possimus magni</h2>
                            <p>
                                quo deleniti praesentium dicta non quod\naut est molestias\nmolestias et officia quis
                                nihil\nitaque dolorem quia
                            </p>
                        </Container>
                        <Container>
                            <h2>temporibus sit alias delectus eligendi possimus magni</h2>
                            <p>
                                quo deleniti praesentium dicta non quod\naut est molestias\nmolestias et officia quis
                                nihil\nitaque dolorem quia
                            </p>
                        </Container>
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
        </Container>
    );
};

export default Home;
