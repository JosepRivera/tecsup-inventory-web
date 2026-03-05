import axios from "axios";

// Use explicit API URL from environment, with a safe production-default
// Fallback to the public API when not provided (helps deployed environments)
const apiBase: string =
  (import.meta.env.VITE_API_URL as string) || "https://tecsup-inventory-api.onrender.com";

const client = axios.create({
  baseURL: apiBase,
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
