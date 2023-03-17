/**
 * @author Claudio Metelli
 */

/**
 * AuthService class provides services relating to the authentication across the frontend application
 * His function is to provide fake login and logout using localStorage
 */
class AuthService {
    login = (user) => {
        localStorage.setItem("user", JSON.stringify(user));
    };

    logout = () => {
        localStorage.removeItem("user");
    };

    getUserProfile = () => {
        const user = localStorage.getItem("user");
        return user != null ? JSON.parse(user) : undefined;
    };
}

const service = new AuthService();
export default service;
