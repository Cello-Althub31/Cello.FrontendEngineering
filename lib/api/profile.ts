import axios from "axios";
import { API_URI } from "@/lib/utils/uri";

const profileApi = {
  getById: (id: string) => axios.get(`${API_URI}/profile/user/${id}`),
};

export default profileApi;