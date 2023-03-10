import endpoints from "../config/endpoints";

class UserService {
    getUserById = (userId) => {
        return fetch(endpoints.getUserById.replace(":id", userId), {
            method: "GET",
            mode: "cors",
            headers: { "content-type": "application/json" },
        });
    };
}

const service = new UserService();
export default service;
