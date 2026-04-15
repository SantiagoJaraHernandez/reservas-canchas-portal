import apiAuth from "../config/apiAuth";

function authServices() {

    async function register(newUser) {
        try {
            const { data } = await apiAuth.post("/auth/register", newUser);
            console.log(data)
            return data;
        } catch (error) {
            console.error(error.response?.data);
        }
    };

    async function login(userLogin) {
        try {
            const { data } = await apiAuth.post("/auth/login", userLogin);
            console.log(data)
            localStorage.setItem("token", data.token)
            return data;
        } catch (error) {
            console.error(error.response?.data)
        }
    }
    return { register, login }

}

export default authServices;