import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import UserService from "./../services/UserService";
import AuthService from "./../services/AuthService";

const MyNavbar = () => {
    const [users, setUsers] = useState([]);
    const [signedInUser, setSignedInUser] = useState({});

    useEffect(() => {
        const updateUsers = (users) => {
            setUsers(users);
        };
        const updateSignedInUser = () => {
            const user = AuthService.getUserProfile();
            if (user) setSignedInUser(user);
        };
        UserService.getUsers().then((res) => {
            updateUsers(res.data);
            updateSignedInUser();
        });
    }, []);

    const handleLogin = (user) => {
        AuthService.login(user);
        setSignedInUser(user);
    };

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">Xtreamers!</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            {users.map((user) => (
                                <NavDropdown.Item key={user.id}>
                                    <Container className="d-grid gap-2">
                                        <Button
                                            onClick={() => handleLogin(user)}
                                        >{`${user.id} - ${user.username}`}</Button>
                                    </Container>
                                </NavDropdown.Item>
                            ))}
                        </NavDropdown>
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
