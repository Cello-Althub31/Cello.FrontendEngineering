import apiClient from "@/lib/utils/apiClient";


const profileApi = {
  getById: (id: string) => apiClient.get(`/profile/user/${id}`),

  create: (data: CreateProfileRequest) =>
    apiClient.post(`/profile`, data),

  patch: (id: string, data: IProfilePatch) =>
    apiClient.patch(`/profile/user/${id}`, data),
};

export default profileApi;
