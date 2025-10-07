import axios from 'axios';
import { API_URI } from "@/lib/utils/uri";
import { secureStorage } from "@/lib/utils/secureStorage";


// Create axios instance so we can add interceptors if needed later
const apiClient = axios.create({
  baseURL: API_URI,
});

// Add token automatically before each request
apiClient.interceptors.request.use(async (config) => {
  const token = await secureStorage.getTokens();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const emergencyContactApi = {
  getById: (id: string) => apiClient.get(`/emergencyContact/${id}`),

  createEmergencyContact: (data: createEmergencyContactRequest) =>
    apiClient.post(`/emergencyContact`, data),
};

export default emergencyContactApi;