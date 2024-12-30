import React from "react";
import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});
const useAxiosSecure = () => {
  const { LogOut } = useAuth();
  const navigate = useNavigate();

  axiosSecure.interceptors.request.use(
    async (config) => {
      let token = localStorage.getItem("access_token");

      // Retry to get the token if it's not yet set
      if (!token) {
        console.warn("Token not found, waiting...");
        await new Promise((resolve) => setTimeout(resolve, 500)); // Wait 500ms
        token = localStorage.getItem("access_token");
      }
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      } else {
        console.warn("No token found in localStorage");
      }

      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const state = error.response.status;
      console.log("state error in the interceptors", state);
      if (state === 401 || state === 403) {
        await LogOut();
        setTimeout(() => navigate("/login"), 0);
      }
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
