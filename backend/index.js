// Using import, not require, because of lowdb (https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c#how-can-i-move-my-commonjs-project-to-esm)
import express from "express";
import http from "http";

import userRoute from "./routes/userRoute.js";
import postRoute from "./routes/postRoute.js";

const PORT = 3000;
const app = express();
const server = http.createServer(app);

// Utility Middlewares
app.use(express.json());

// Routes
app.use("/users", userRoute);
app.use("/posts", postRoute);

server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
