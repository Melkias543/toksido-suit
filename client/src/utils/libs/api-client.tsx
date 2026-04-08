import axios from "axios";

const apiClient = axios.create({
  // Use environment variables for production vs development
  baseURL: process.env.NEXT_PUBLIC_API_URL,

  headers: {
    "Content-Type": "application/json",
  },
});

// GLOBAL INTERCEPTORS (The real "Global Config" power)
// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token"); // Or cookies
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // Global logic: redirect to login if unauthorized
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

export default apiClient;