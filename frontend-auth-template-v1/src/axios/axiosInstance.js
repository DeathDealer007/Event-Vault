import axios from "axios";

const axiosInstance = axios.create({
<<<<<<< HEAD
  baseURL: import.meta.env.VITE_BACKEND_URL, // ✅ dynamic from env
  timeout: 60000,
  withCredentials: true, // ✅ allow cookies (JWT/session)
=======
    baseURL: import.meta.env.VITE_BACKEND_URL,
    timeout: 60000,
    withCredentials: true,
    headers: { "X-Custom-Header": "foobar" },
>>>>>>> 35a0997ceba2a60fec13a93c9099d86a9c4766ee
});

export { axiosInstance };
