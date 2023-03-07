import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";

const postAdapter = new JSONFileSync("./../database/posts.json");
export const posts = new LowSync(postAdapter);
posts.read();

export default db;
