import apiClient from '@/lib/utils/apiClient';

const emergencyContactApi = {
  getAll: () => apiClient.get('/emergencyContact'),
  getById: (id: string) => apiClient.get(`/emergencyContact/${id}`),

  createEmergencyContact: (data: createEmergencyContactRequest) =>
    apiClient.post(`/emergencyContact`, data),
};

export default emergencyContactApi;