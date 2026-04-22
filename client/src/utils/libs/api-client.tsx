
// import axios from "axios";
// import { toast } from "sonner";

// const apiClient = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
//   withCredentials: true,
// });

// apiClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Rate Limiting Check
//     if (error.response?.status === 429) {
//       toast.error("Too many requests. Please slow down.");
//       return Promise.reject(error);
//     }

//     // 401 Unauthorized - Token likely expired
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         // Use a standard axios call here to avoid interceptor recursion
//        await axios.post(
//   `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
//   {},
//   { withCredentials: true }
// );

//         // Retry the original request with the new cookie
//         return apiClient(originalRequest);
//       } catch (refreshError) {
//         console.error("Refresh failed:", refreshError);

//         // ONLY redirect if the refresh call itself failed
//         if (typeof window !== "undefined") {
//           // Optional: Only redirect if it's a 403 or 401 from the refresh call
//           window.location.href = "/auth/login";
//         }
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   },
// );

// export default apiClient;





import axios from "axios";
import { toast } from "sonner";

// Use a fallback or a constant to ensure it's never undefined
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 429) {
      toast.error("Too many requests. Please slow down.");
      return Promise.reject(error);
    }

    // 401 Unauthorized - Token likely expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Use the same BASE_URL variable
        await axios.post(
          `${BASE_URL}/auth/refresh`, 
          {},
          { withCredentials: true }
        );

        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error("Refresh failed:", refreshError);

        if (typeof window !== "undefined") {
          // AVOID REDIRECT LOOP: Only redirect if NOT already on login page
          const isLoginPage = window.location.pathname.includes("/auth/login");
          if (!isLoginPage) {
            window.location.href = "/auth/login";
          }
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
