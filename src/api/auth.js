import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

export const loginUser = (data) => api.post("/auth/login", data);
export const registerUser = (data) => api.post("/auth/register", data);

export const getProfile = (token) =>
  api.get("/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
