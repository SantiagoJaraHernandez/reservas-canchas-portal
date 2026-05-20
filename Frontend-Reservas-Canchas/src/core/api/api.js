import axiosClient from "./axiosClient";

const AUTH_BASE = "http://localhost:8082";

const handle = async (promise) => {
  try {
    const { data } = await promise;
    return data;
  } catch (error) {
    const message =
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message ||
      "Error inesperado";

    throw {
      message,
      status: error.response?.status,
      original: error,
    };
  }
};

export const api = {
  get: (url) => handle(axiosClient.get(url)),

  post: (url, payload) => handle(axiosClient.post(url, payload)),

  put: (url, payload) => handle(axiosClient.put(url, payload)),

  delete: (url) => handle(axiosClient.delete(url)),

  postAuth: (url, payload) =>
    handle(
      axiosClient.post(`${AUTH_BASE}${url}`, payload)
    ),
};