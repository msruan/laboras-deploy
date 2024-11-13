import axios, { AxiosInstance } from "axios";
const dockerURL = import.meta.env.VITE_LABORAS_BACK_API_URL;

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: dockerURL,
  headers: {
    "Content-type": "application/json",
  },
});

export default axiosInstance;
