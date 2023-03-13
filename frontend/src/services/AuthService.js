class AuthService {
    login = (user) => {
        localStorage.setItem("user", JSON.stringify(user));
    };

    getUserProfile = () => {
        const user = localStorage.getItem("user");
        return user != null ? JSON.parse(user) : undefined;
    };
}

const service = new AuthService();
export default service;
