import axios from "axios";
import { APP_LOGIN_URL } from "@/config/api";

const api = axios.create({
  baseURL: (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080").replace(/\/$/, "") + "/api/v1",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      if (typeof window !== "undefined") {
        window.location.href = APP_LOGIN_URL;
      }
    }
    return Promise.reject(error);
  }
);

export default api;
