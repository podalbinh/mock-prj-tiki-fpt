import { PUBLIC_API_ENDPOINTS } from "@/constant/endpoint";
import axios from "axios";

// Tạo axios instance đơn giản
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor để thêm auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    const endpoint = config.url?.replace(config.baseURL || "", "") || "";

    if (token && !PUBLIC_API_ENDPOINTS.includes(endpoint)) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor để handle common errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      // Redirect to login page or handle unauthorized
    }
    return Promise.reject(error);
  }
);

export default apiClient;
