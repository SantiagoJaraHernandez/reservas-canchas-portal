import api from "../config/api";

export async function getReservas() {
  const { data } = await api.get("/reservas");
  return data;
}

export async function getReservaById(id) {
  const { data } = await api.get(`/reservas/${id}`);
  return data;
}

export async function createReserva(payload) {
  const { data } = await api.post("/reservas", payload);
  return data;
}

export async function updateReserva(id, payload) {
  const { data } = await api.put(`/reservas/${id}`, payload);
  return data;
}

export async function deleteReserva(id) {
  await api.delete(`/reservas/${id}`);
}