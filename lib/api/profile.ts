import axios from "axios";
import { API_URI } from "@/lib/utils/uri";
import { secureStorage } from "@/lib/utils/secureStorage"; // adjust import if needed

// Create axios instance so we can add interceptors if needed later
const apiClient = axios.create({
  baseURL: API_URI,
});

// Add token automatically before each request
apiClient.interceptors.request.use(async (config) => {
  const token = await secureStorage.getTokens();
  console.log("Attaching token to request:", token,);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const profileApi = {
  getById: (id: string) => apiClient.get(`/profile/user/${id}`),

  createProfile: (data: CreateProfileRequest) => 
    apiClient.post(`/profile`, data),
  
};

export default profileApi;
