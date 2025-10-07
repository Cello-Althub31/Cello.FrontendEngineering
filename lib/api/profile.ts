import apiClient from "@/lib/utils/apiClient";


const profileApi = {
  getById: (id: string) => apiClient.get(`/profile/user/${id}`),

  createProfile: (data: CreateProfileRequest) =>
    apiClient.post(`/profile`, data),

};

export default profileApi;
