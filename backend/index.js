/**
 * @author Claudio Metelli
 *
 * For more info about this API: https://jsonplaceholder.typicode.com/
 */

// Using import, not require, because of lowDB:
// https://github.com/typicode/lowdb#usage
// https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c#how-can-i-move-my-commonjs-project-to-esm
import express from "express";
import http from "http";
import cors from "cors";

import config from "./config/config.js";

import userRoute from "./routes/userRoute.js";
import postRoute from "./routes/postRoute.js";
import commentsRoute from "./routes/commentsRoute.js";

const PORT = config.PORT;
const app = express();
const server = http.createServer(app);

const corsOptions = {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    optionsSuccessStatus: 204,
};

// Utility Middlewares
app.use(express.json());
app.use(cors(corsOptions));

// Routes
app.use("/users", userRoute);
app.use("/posts", postRoute);
app.use("/comments", commentsRoute);

// Other requests are not allowed
app.all("*", (req, res) => res.status(405).send("Method not allowed"));

// Starting server
server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
