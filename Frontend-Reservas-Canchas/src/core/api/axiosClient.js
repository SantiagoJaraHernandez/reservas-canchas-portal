import axios from "axios";
import useAuthStore from "@/app/store/authStore";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080",
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const logout = useAuthStore.getState().logout;

    const status = error.response?.status;


    if (status === 401 || status === 403) {
      logout();
      window.location.href = "/login";
    }

    const message =
      error.response?.data?.error ||
      error.response?.data?.message ||
      "Error inesperado";

    return Promise.reject({
      message,
      status: error.response?.status,
    });
  }
);

export default axiosClient;