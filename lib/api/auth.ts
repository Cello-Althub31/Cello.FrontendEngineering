import axios from "axios";
import { API_URI } from "@/lib/utils/uri";
import {
  ForgotPasswordRequest,
  GoogleSignInResponse,
  LoginRequest,
  ResetPasswordRequest,
  SignUpRequest,
  VerifyEmailRequest,
} from "@/types/auth";
import apiClient from "../utils/apiClient";

const authApi = {
  signup: (data: SignUpRequest) => axios.post(`${API_URI}/auth/signup`, data),

  login: (data: LoginRequest) => axios.post(`${API_URI}/auth/login`, data),

  loggedInUser: () => apiClient.get(`${API_URI}/auth/me`),

  verifyEmail: (data: VerifyEmailRequest) =>
    axios.post(`${API_URI}/auth/verifyEmail`, data),

  forgotPassword: (data: ForgotPasswordRequest) =>
    axios.post(`${API_URI}/auth/forgotPassword`, data),

  resetPassword: (data: ResetPasswordRequest) =>
    axios.post(`${API_URI}/auth/resetPassword`, data),

  googleOAuth: (data: GoogleSignInResponse) =>
    axios.post(`${API_URI}/auth/google`, data),
};

export default authApi;
