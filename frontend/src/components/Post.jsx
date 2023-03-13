import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";

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

    return (
        <Container>
            <h2>{props.title}</h2>
            <h4>{`${user.username}, ${user.name}`}</h4>
            <p>{props.body}</p>
        </Container>
    );
};

export default Post;
