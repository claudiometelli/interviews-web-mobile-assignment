import express from "express";

import config from "../config/config.js";
import { users } from "./../database/dbReader.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.json(users.data.slice(0, config.maxUsersQuery));
});

router.get("/:id", (req, res) => {
    const userId = req.params.id;
    const result = users.data.find((user) => user.id == userId);
    if (result === undefined) {
        return res.status(404).send("User not Found");
    }
    res.json(result);
});

export default router;
