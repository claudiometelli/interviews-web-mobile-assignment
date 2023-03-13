import axios from "axios";

import endpoints from "../config/endpoints";

class UserService {
    getUsers = () => {
        return fetch(endpoints.getUsers);
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
