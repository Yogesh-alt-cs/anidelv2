
import axios from "axios";
import config from "../config/config";

const API_BASE_URL =
    import.meta.env.VITE_APP_MODE === "development"
        ? config.localUrl
        : config.serverUrl;

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
});

// Optional: Add interceptor for logging or global error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // console.error("API Error:", error); 
        return Promise.reject(error);
    }
);

export default api;
