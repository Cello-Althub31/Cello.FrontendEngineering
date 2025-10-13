import apiClient from '@/lib/utils/apiClient';


const remindersApi = {
  getMedicationsById: (id: string) => apiClient.get(`/medications/${id}`),

  getMedicationSummary: (id: string) => apiClient.get(`/medications/${id}/summary`),

  getActiveReminder: () => apiClient.get('/reminders/active'),

  createMedicationReminder: (data: any) =>
    apiClient.post(`/medications`, data),

  getMedications: () => apiClient.get(`/medications`),

  hydrationReminder: (data: any) =>
    apiClient.post(`/hydration`, data),

  doctorAppointmentReminder: (data: any) =>
    apiClient.post(`/appointments`, data),
};

export default remindersApi;