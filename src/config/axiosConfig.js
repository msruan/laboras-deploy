import axios from "axios";
const baseURL = "localhost:3000"

export const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json",
  },
});

export default axiosInstance;