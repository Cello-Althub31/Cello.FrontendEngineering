/**
 * Authentication related type definitions
 */

export interface User {
  _id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  isEmailVerified?: boolean;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn?: number;
  tokenType?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface VerifyEmailRequest {
  email: string;
  code: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
  message: string;
}

export interface ApiError {
  message: string;
  code: string;
  details?: Record<string, any>;
}

export interface AuthState {
  user: IUser | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  hasRehydrated: boolean;
}

export interface GoogleSignInResponse {
  user?: {
    id: string;
    email: string;
    name: string;
    photo?: string;
  };
  idToken: string;
}

export interface IUser {
  _id: string;
  email: string;
  user_status?: string;
  profilePicture?: string | null;
  signupMethod?: string;
  isEmailVerified?: boolean;
  isOAuthUser?: boolean;
  createdAt?: string;
  updatedAt?: string;
  verificationCode?: string;
  verificationCodeExpiry?: string;
  fullName?: string;
  dateOfBirth?: string;
  gender?: string;
  genotype?: string;
  diagnosis?: string;
}