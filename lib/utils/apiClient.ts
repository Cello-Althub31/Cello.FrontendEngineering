import axios from "axios";
import Toast from "react-native-toast-message";
import { secureStorage } from "@/lib/utils/secureStorage";
import { reduxStore } from "@/lib/store/reduxStore";
import { API_URI } from "@/lib/utils/uri";
import { logout } from "../auth/authSlice";
import { router } from "expo-router";

const apiClient = axios.create({
  baseURL: API_URI,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = await secureStorage.getTokens();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log("⚠️ Unauthorized — logging out user");

      await secureStorage.clearTokens();
      await secureStorage.clearUser();

      reduxStore.dispatch(logout());

      Toast.show({
        type: "info",
        text1: "Session expired",
        text2: "Please log in again.",
      });

      router.replace("/auth/login");

      return Promise.reject("Session expired. Please log in again.");
    }

    return Promise.reject(error);
  }
);

export default apiClient;
