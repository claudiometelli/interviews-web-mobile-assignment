import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import AuthService from "./../services/AuthService";

const MyNavbar = (props) => {
    const [signedInUser, setSignedInUser] = useState({});

    useEffect(() => {
        const user = AuthService.getUserProfile();
        if (user) {
            setSignedInUser(user);
        } else {
            setSignedInUser({});
        }
    }, [props.signedInUser]);

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">Xtreamers!</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    {signedInUser.id ? (
                        <Navbar.Text>Signed in as: {`${signedInUser.id} - ${signedInUser.username}`}</Navbar.Text>
                    ) : (
                        ""
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default MyNavbar;
