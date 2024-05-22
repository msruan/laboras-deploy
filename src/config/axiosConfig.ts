import axios, { AxiosInstance } from "axios";
const baseURL = "http://localhost:3000";
const dockerURL = "http://localhost:8000/api";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json",
  },
});

export const axiosBackInstance: AxiosInstance = axios.create({
  baseURL: dockerURL,
  headers: {
    "Content-type": "application/json",
  },
});

export default axiosInstance;
