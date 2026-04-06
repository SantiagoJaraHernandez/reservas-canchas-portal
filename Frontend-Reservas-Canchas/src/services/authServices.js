import api from "../config/api";

const authServices = {
    register: (newUser) => api.post("/register", newUser).then(user => user.data),
    login: (user) => api.post("/login", user).then(user => user.data),
}
export default authServices;