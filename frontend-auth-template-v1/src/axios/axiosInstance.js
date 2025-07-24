import axios from "axios";

// Ensure your .env file contains: VITE_BACKEND_URL=https://event-vault.onrender.com/api/v1
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // e.g., https://event-vault.onrender.com/api/v1
  timeout: 60000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export { axiosInstance };
