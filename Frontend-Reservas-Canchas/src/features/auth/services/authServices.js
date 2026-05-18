import apiAuth from "../../../config/apiAuth";

function authServices() {
  async function register(newUser) {
    try {
      const { data } = await apiAuth.post("/auth/register", newUser);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async function login(userLogin) {
    try {
      const { data } = await apiAuth.post("/auth/login", userLogin);
      localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      throw error;
    }
  }

  function logout() {
    localStorage.removeItem("token");
  }

  return { register, login, logout };
}

export default authServices;