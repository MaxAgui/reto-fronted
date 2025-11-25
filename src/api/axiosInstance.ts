import axios from "axios";

export const api = axios.create({
  baseURL: "https://rimac-front-end-challenge.netlify.app/api",
  timeout: 8000,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log("API Error:", err?.message);
    return Promise.reject(err);
  }
);
