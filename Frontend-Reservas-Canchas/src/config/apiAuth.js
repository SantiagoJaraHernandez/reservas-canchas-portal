import axios from "axios";
import API_URL from "./apiBase";

const apiAuth = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  }
});

export default apiAuth;