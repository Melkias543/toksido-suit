import axios from "axios";

const apiClient = axios.create({
  // Use environment variables for production vs development
  baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true, // Essential to send cookies (Refresh Token)
  headers: {
    "Content-Type": "application/json",
  },
});


apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 (Unauthorized) and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        /**
         * Call the refresh-token endpoint.
         * Your Express server should check the 'refreshToken' cookie here
         * and set a new 'accessToken' cookie in the response.
         */
        await apiClient.post("/refresh-token");

        /**
         * After a successful refresh, the browser now has the new cookie.
         * We retry the original failed request.
         * Axios will automatically include the new cookie this time.
         */
        return apiClient(originalRequest);
      } catch (refreshError) {
        /**
         * If the refresh-token call fails (e.g., refresh token is also expired),
         * we force the user to the login page.
         */
        if (typeof window !== "undefined") {
          window.location.href = "/auth/login";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);


export default apiClient;