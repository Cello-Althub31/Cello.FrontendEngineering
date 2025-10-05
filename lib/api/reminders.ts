import axios from 'axios';
import { API_URI } from "@/lib/utils/uri";
import { secureStorage } from "@/lib/utils/secureStorage";
import { Reminder, ReminderPayload } from '../types/reminders';

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

const remindersApi = {
  getById: (id: string) => apiClient.get(`/medications${id}`),

  createReminder: (data: createMedicationReminderRequest) =>
    apiClient.post(`/reminder`, data),

  hydrationReminder: (data: createHydrationReminderRequest) =>
    apiClient.post(`/reminder`, data),

  doctorAppointmentReminder: (data: createDoctorAppointmentRequest) =>
    apiClient.post(`/reminder`, data),
};

export default remindersApi;