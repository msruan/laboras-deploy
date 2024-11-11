import axios, { AxiosInstance } from "axios";
const dockerURL = "http://localhost:8000";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: dockerURL,
  headers: {
    "Content-type": "application/json",
  },
});

export default axiosInstance;
