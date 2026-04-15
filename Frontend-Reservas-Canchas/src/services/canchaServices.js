import api from "../config/api";

export async function getCanchas() {
  const { data } = await api.get("/canchas");
  return data;
}

export async function getCanchaById(id) {
  const { data } = await api.get(`/canchas/${id}`);
  return data;
}

export async function createCancha(payload) {
  const { data } = await api.post("/canchas", payload);
  return data;
}

export async function updateCancha(id, payload) {
  const { data } = await api.put(`/canchas/${id}`, payload);
  return data;
}

export async function deleteCancha(id) {
  await api.delete(`/canchas/${id}`);
}