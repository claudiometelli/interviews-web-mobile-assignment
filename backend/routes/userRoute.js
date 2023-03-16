/**
 * @author Claudio Metelli
 *
 * For more info about this API: https://jsonplaceholder.typicode.com/
 */
import express from "express";

import config from "../config/config.js";
import { users } from "./../database/dbReader.js";

/**
 * -- USER SCHEMA --
 *
 * {
 *      id: int,
 *      name: string,
 *      username: string,
 *      email: email-string,
 *      address: {
 *          street: string,
 *          suite: string,
 *          city: string,
 *          zipcode: zipcode-string,
 *          geo: {
 *              lat: float,
 *              lng: float
 *          }
 *      },
 *      phone: phone-number-string,
 *      website: website-string,
 *      company: {
 *          name: string,
 *          catchPhrase: string,
 *          bs: string
 *      }
 * }
 */

const router = express.Router();

/**
 * GET request on /users
 * always takes a maximum of <config.maxUsersQuery> from db and returns
 *
 * @return {Array} a list of users inside res object
 */
router.get("/", (req, res) => {
    res.json(users.data.slice(0, config.maxUsersQuery));
});

/**
 * GET request on /users/id
 * if user is not found, it returns a 404 error inside res object
 *
 * @return {Object} the user object with that id inside res object
 */
router.get("/:id", (req, res) => {
    const userId = req.params.id;
    const result = users.data.find((user) => user.id == userId);
    if (result === undefined) {
        return res.status(404).send("User not Found");
    }
    return res.json(result);
});

export default router;
