// Using import, not require, because of lowdb (https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c#how-can-i-move-my-commonjs-project-to-esm)
import express from "express";
import http from "http";
import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";

const adapter = new JSONFileSync("./../database/db.json");
const db = new LowSync(adapter);
db.read();

const PORT = 3000;
const app = express();
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
    console.log(db.data);
});
