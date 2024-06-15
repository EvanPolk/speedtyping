import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://word-api.azurewebsites.net/api/v1",
  timeout: 5000,
  responseType: "json",
})

export default axiosInstance