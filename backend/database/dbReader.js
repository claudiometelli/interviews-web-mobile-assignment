/**
 * @author Claudio Metelli
 *
 * For more info about this API: https://jsonplaceholder.typicode.com/
 *
 * This file reads from LowDB database located in /database folder
 * It exports JSON arrays after reading
 * It is used by routes to provide data to client
 * The schema of a single file con be found in the appropriate route (example: post schema is located in postRoute)
 */

import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";

// reading users JSON file
const userAdapter = new JSONFileSync("./../database/users.json");
export const users = new LowSync(userAdapter);
users.read();

// reading posts JSON file
const postAdapter = new JSONFileSync("./../database/posts.json");
export const posts = new LowSync(postAdapter);
posts.read();

// reading comments JSON file
const commentAdapter = new JSONFileSync("./../database/comments.json");
export const comments = new LowSync(commentAdapter);
comments.read();
