import apiClient from "@/lib/utils/apiClient";

const journalApi = {
  createFolder: (data: { "type": string }) =>
    apiClient.post(`/folders`, data),

  allFolders: () => apiClient.get('/folders'),

  createJournal: (data: IJournalEntry) =>
    apiClient.post(`/journals`, data),

  getJournalByFolder: (folderId: string) => apiClient.get(`/journals/folder/${folderId}`),

  getJournalById: (id: string) => apiClient.get(`/journals/${id}`),

  patchJournal: (id: string, data: IJournalPatch) =>
    apiClient.patch(`/journals/${id}`, data),

  deleteJournal: (id: string) => apiClient.delete(`/journals/${id}`),
};

export default journalApi;
