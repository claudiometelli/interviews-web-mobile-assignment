import React from "react";

import Container from "react-bootstrap/Container";

const Post = (props) => {
    return (
        <Container>
            <h2>{props.title}</h2>
            <h4>{props.user}</h4>
            <p>{props.body}</p>
        </Container>
    );
};

export default Post;
