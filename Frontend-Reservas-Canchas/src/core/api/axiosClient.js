import axios from "axios";

let onLogout = null;

export const setLogoutHandler = (callback) => {
  onLogout = callback;
};

const axiosClient = axios.create({
  baseURL: "http://localhost:8080",
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  
  if (token && !config.url.includes("/auth")) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401 && onLogout) {
      onLogout();
    }

    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Error inesperado";

    return Promise.reject(message);
  }
);

export default axiosClient;