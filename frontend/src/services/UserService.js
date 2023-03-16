/**
 * @author Claudio Metelli
 */
import axios from "axios";

import endpoints from "../config/endpoints";

/**
 * UserService class provides services relating to users across the frontend application
 * His function is to make call to the server relating to users (/users)
 * Every method of the class return a function and then, in the react component use promises (then() and catch())
 * Calls are defined in config/endpoint.js
 */
class UserService {
    getUsers = () => {
        return axios.get(endpoints.getUsers);
    };

    getUserById = (userId) => {
        return axios(endpoints.getUserById.replace(":id", userId), {
            method: "GET",
            mode: "cors",
            headers: { "content-type": "application/json" },
        });
    };
}

const service = new UserService();
export default service;
