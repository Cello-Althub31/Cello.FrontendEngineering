import apiClient from '@/lib/utils/apiClient';

const emergencyContactApi = {
  getAll: () => apiClient.get('/emergencyContact'),

  getById: (id: string) => apiClient.get(`/emergencyContact/${id}`),

  create: (data: createEmergencyContactRequest) =>
    apiClient.post(`/emergencyContact`, data),

  patch: (id: string, data: { fullName: string }) =>
    apiClient.patch(`/emergencyContact/${id}`, data),

  delete: (id: string) => apiClient.get(`/emergencyContact/${id}`),
};

export default emergencyContactApi;