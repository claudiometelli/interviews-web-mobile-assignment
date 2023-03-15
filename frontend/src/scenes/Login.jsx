import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

import AuthService from "./../services/AuthService";
import UserService from "./../services/UserService";
import Navbar from "../components/Navbar";

const Login = () => {
    const [signedInUser, setSignedInUser] = useState({});
    const [users, setUsers] = useState([]);

    const handleLogin = (user) => {
        AuthService.login(user);
        setSignedInUser(user);
    };

    useEffect(() => {
        const actualUser = AuthService.getUserProfile();
        setSignedInUser(actualUser);
        UserService.getUsers().then((res) => {
            setUsers(res.data);
        });
    }, []);

    return (
        <Container fluid>
            <Navbar signedInUser={signedInUser} />
            <Container className="justify-content-md-center text-center">
                <h2>Choose your user!</h2>
                {users.map((user) => (
                    <Row key={user.id}>
                        <Button
                            key={user.id}
                            className="m-2"
                            onClick={() => handleLogin(user)}
                        >{`${user.id} - ${user.username}`}</Button>
                    </Row>
                ))}
            </Container>
        </Container>
    );
};

export default Login;
