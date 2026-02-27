import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000, // 30s porque claude vision puede tardar
});

export default client;
