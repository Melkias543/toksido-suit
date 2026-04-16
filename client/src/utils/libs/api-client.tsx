
import axios from "axios";
import { toast } from "sonner";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Rate Limiting Check
    if (error.response?.status === 429) {
      toast.error("Too many requests. Please slow down.");
      return Promise.reject(error);
    }

    // 401 Unauthorized - Token likely expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Use a standard axios call here to avoid interceptor recursion
        await axios.post(
          "http://localhost:8000/api/auth/refresh",
          {},
          { withCredentials: true },
        );

        // Retry the original request with the new cookie
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error("Refresh failed:", refreshError);

        // ONLY redirect if the refresh call itself failed
        if (typeof window !== "undefined") {
          // Optional: Only redirect if it's a 403 or 401 from the refresh call
          window.location.href = "/auth/login";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;