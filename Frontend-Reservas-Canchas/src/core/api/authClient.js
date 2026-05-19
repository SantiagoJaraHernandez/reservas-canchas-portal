import axios from "axios";

const authClient = axios.create({
  baseURL: "http://localhost:8082",
});

// interceptor (copiado del tuyo)
authClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

authClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.error || "Error inesperado";

    return Promise.reject(message);
  }
);

export default authClient;