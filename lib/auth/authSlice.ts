import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { secureStorage } from "@/lib/utils/secureStorage";
import authApi from "@/lib/api/auth";
import {
  AuthState,
  ForgotPasswordRequest,
  GoogleSignInResponse,
  LoginRequest,
  ResetPasswordRequest,
  SignUpRequest,
  VerifyEmailRequest,
} from "@/types/auth";

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

export const signup = createAsyncThunk(
  "auth/signup",
  async (payload: SignUpRequest, { rejectWithValue }) => {
    try {
      const res = await authApi.signup(payload);
      return res.data;
    } catch (error: any) {
      console.error("console error:", error);
      if (error.response) {
        const status = error.response.status;
        const data = error.response.data;

        // Handle 429 Too Many Requests specifically
        if (status === 429) {
          return rejectWithValue({
            status,
            message: "Too many signup attempts. Please try again later.",
          });
        }

        // Handle Mongo duplicate key (email already exists)
        if (
          data?.error?.includes("duplicate key error") &&
          data?.error?.includes("email")
        ) {
          return rejectWithValue({
            status,
            message: "This email is already registered.",
          });
        }

        // Fallback for other API errors
        return rejectWithValue({
          status,
          message: data?.error || "Something went wrong. Please try again.",
        });
      }

      // If it’s a network error or unexpected error
      return rejectWithValue({
        status: 500,
        message:
          error.message || "Network error. Please check your connection.",
      });
    }
  }
);


export const login = createAsyncThunk(
  "auth/login",
  async (payload: LoginRequest, { rejectWithValue }) => {
    try {
      const res = await authApi.login(payload);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (payload: VerifyEmailRequest, { rejectWithValue }) => {
    try {
      const res = await authApi.verifyEmail(payload);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Verification failed"
      );
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (payload: ForgotPasswordRequest, { rejectWithValue }) => {
    try {
      const res = await authApi.forgotPassword(payload);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Request failed");
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (payload: ResetPasswordRequest, { rejectWithValue }) => {
    try {
      const res = await authApi.resetPassword(payload);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Request failed");
    }
  }
);

export const googleOAuth = createAsyncThunk(
  "auth/googleOAuth",
  async (payload: GoogleSignInResponse, { rejectWithValue }) => {
    try {
      const res = await authApi.googleOAuth(payload);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Google sign-in failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      secureStorage.clearTokens();
      secureStorage.clearUser();
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(rehydrateAuth.fulfilled, (state, action) => {
        if (action.payload) {
          state.token = action.payload.tokens?.accessToken || null;
          state.user = action.payload.user;
        }
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null;

        secureStorage.storeTokens(action.payload.token);
        secureStorage.storeUser(action.payload.user);
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.error = null;

        secureStorage.storeTokens(action.payload.token);
        secureStorage.storeUser(action.payload.user);
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.isLoading = false;
          state.error =
            (action as { payload?: string }).payload ?? "An error occurred";
        }
      );
  },
});

export const rehydrateAuth = createAsyncThunk(
  "auth/rehydrateAuth",
  async (_, { rejectWithValue }) => {
    try {
      const tokens = await secureStorage.getTokens();
      const user = await secureStorage.getUser();
      if (tokens && user) {
        return { tokens, user };
      }
      return null;
    } catch (e) {
      return rejectWithValue("Failed to restore auth");
    }
  }
);

export const { logout } = authSlice.actions;
export default authSlice.reducer;
