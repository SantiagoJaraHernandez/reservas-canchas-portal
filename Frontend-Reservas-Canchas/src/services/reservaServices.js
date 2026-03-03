import axios from "axios";

const API_URL = "http://localhost:8081/reservas";
export const getReservas = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const crearReserva = async (reserva) => {
  const response = await axios.post(API_URL, reserva);
  return response.data;
};
