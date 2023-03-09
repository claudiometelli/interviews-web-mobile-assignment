import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import Navbar from "../components/Navbar";

const Home = () => {
    const bgRed = {
        backgroundColor: "red",
    };
    return (
        <Container fluid>
            <Navbar />
            <Container></Container>
        </Container>
    );
};

export default Home;
