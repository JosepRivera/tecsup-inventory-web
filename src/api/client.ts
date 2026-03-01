import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
});

// Interceptor para inyectar el técnico en cada petición
client.interceptors.request.use((config) => {
  const tecnico = localStorage.getItem("tecnico_nombre");
  if (tecnico) {
    config.headers["X-Tecnico"] = tecnico;
  }
  return config;
});

export default client;
