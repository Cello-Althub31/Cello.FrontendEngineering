import * as SecureStore from "expo-secure-store";
import { AuthTokens } from "@/types/auth";

const TOKEN_KEY = "auth_token";
const USER_KEY = "user_info";

export const secureStorage = {
  async storeTokens(tokens: AuthTokens) {
    await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(tokens));
  },
  async getTokens(): Promise<AuthTokens | null> {
    const json = await SecureStore.getItemAsync(TOKEN_KEY);
    return json ? JSON.parse(json) : null;
  },
  async clearTokens() {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  },
  async getUser() {
    const json = await SecureStore.getItemAsync(TOKEN_KEY);
    return json ? JSON.parse(json) : null;
  },
  async clearUser() {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  },
};
