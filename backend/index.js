// Using import, not require, because of lowdb (https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c#how-can-i-move-my-commonjs-project-to-esm)
import express from "express";
import http from "http";

const PORT = 3000;
const app = express();
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
