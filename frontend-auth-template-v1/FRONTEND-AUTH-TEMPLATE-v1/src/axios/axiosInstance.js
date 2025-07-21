import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // ✅ dynamic from env
  timeout: 60000,
  withCredentials: true, // ✅ allow cookies (JWT/session)
});

export { axiosInstance };
