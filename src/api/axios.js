import axios from "axios";

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
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
