import apiClient from '@/lib/utils/apiClient';


const remindersApi = {
  getById: (id: string) => apiClient.get(`/medications${id}`),

  createMedicationReminder: (data: any) =>
    apiClient.post(`/medications`, data),

  hydrationReminder: (data: createHydrationReminderRequest) =>
    apiClient.post(`/reminder`, data),

  doctorAppointmentReminder: (data: any) =>
    apiClient.post(`/appointments`, data),
};

export default remindersApi;