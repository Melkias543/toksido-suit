import axios from "axios";

const apiClient = axios.create({
  // Use environment variables for production vs development
  baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true, // Essential to send cookies (Refresh Token)
  headers: {
    "Content-Type": "application/json",
  },
});

// GLOBAL INTERCEPTORS (The real "Global Config" power)

// const api = axios.create({
//   baseURL: "http://localhost:5000/api", // Your API base URL
//   withCredentials: true, // Essential to send cookies (Refresh Token)
// });

// // REQUEST INTERCEPTOR: Attach Access Token to every request if it exists
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("accessToken"); // Or your preferred state store
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error),
// );

// // RESPONSE INTERCEPTOR: Handle 401 (Expired) errors
// api.interceptors.response.use(
//   (response) => response, // Pass through successful responses
//   async (error) => {
//     const originalRequest = error.config;

//     // If error is 401 and we haven't tried refreshing yet
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         // Call your refresh token endpoint
//         const resp = await axios.post(
//           "http://localhost:5000/api/refresh-token",
//           {},
//           { withCredentials: true },
//         );

//         const { accessToken } = resp.data;
//         localStorage.setItem("accessToken", accessToken);

//         // Update the failed request with the new token and retry
//         originalRequest.headers.Authorization = `Bearer ${accessToken}`;
//         return api(originalRequest);
//       } catch (refreshError) {
//         // Refresh token failed/expired -> Force Logout
//         localStorage.removeItem("accessToken");
//         window.location.href = "/login";
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   },
// );


export default apiClient;