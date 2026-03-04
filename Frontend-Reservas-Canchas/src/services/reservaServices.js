import axios from "axios";

const API_URL = "http://localhost:8080/reservas";

export const getReservas = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getReservaById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const crearReserva = async (reserva) => {
  const response = await axios.post(API_URL, reserva);
  return response.data;
};

export const actualizarReserva = async (id, reserva) => {
  const response = await axios.put(`${API_URL}/${id}`, reserva);
  return response.data;
};

export const eliminarReserva = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
