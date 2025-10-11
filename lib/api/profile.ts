import apiClient from "@/lib/utils/apiClient";


const profileApi = {
  getById: () => apiClient.get(`/profile`),

  create: (data: CreateProfileRequest) =>
    apiClient.post(`/profile`, data),

  patch: (id: string, data: IProfilePatch) =>
    apiClient.patch(`/profile/user/${id}`, data),
};

export default profileApi;
