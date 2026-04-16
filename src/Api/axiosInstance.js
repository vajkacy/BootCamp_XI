import axios from "axios";

const API = axios.create({
  baseURL: "https://api.redclass.redberryinternship.ge/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to add the token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
