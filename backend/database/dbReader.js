import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";

export { db as database };

const adapter = new JSONFileSync("./db.json");
const db = new LowSync(adapter);
db.read();
