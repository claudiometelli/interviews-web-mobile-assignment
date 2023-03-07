import express from "express";
import db from "./../database/dbReader.js";

const router = express.Router();

router.get("/hello", (req, res) => {
    res.json({ hello: "World!", hi: db.data });
});

export default router;
