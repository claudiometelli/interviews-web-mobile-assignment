import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";

const userAdapter = new JSONFileSync("./../database/users.json");
export const users = new LowSync(userAdapter);
users.read();

const postAdapter = new JSONFileSync("./../database/posts.json");
export const posts = new LowSync(postAdapter);
posts.read();

const commentAdapter = new JSONFileSync("./../database/comments.json");
export const comments = new LowSync(commentAdapter);
comments.read();
