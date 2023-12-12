import axios from "axios";

// Create an Axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: "https://mcchats-backend.onrender.com/api",
});

export default axiosInstance;
