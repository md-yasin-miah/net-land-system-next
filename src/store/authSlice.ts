import { createSlice } from "@reduxjs/toolkit";
import type { Permission, Role } from "@/lib/mockData";

const AUTH_STORAGE_KEY = "net-land-auth";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: Role;
  permissions: Permission[];
  avatar?: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
}

function loadAuthFromStorage(): Pick<AuthState, "user" | "token"> {
  if (typeof window === "undefined") return { user: null, token: null };
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return { user: null, token: null };
    const parsed = JSON.parse(raw) as { user: AuthUser; token: string };
    if (!parsed.user || !parsed.token) return { user: null, token: null };
    return { user: parsed.user, token: parsed.token };
  } catch {
    return { user: null, token: null };
  }
}

function saveAuthToStorage(user: AuthUser | null, token: string | null) {
  if (typeof window === "undefined") return;
  try {
    if (!user || !token) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return;
    }
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user, token }));
  } catch {
    // ignore
  }
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(
      state,
      action: { payload: { user: AuthUser; token: string } }
    ) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      saveAuthToStorage(action.payload.user, action.payload.token);
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      saveAuthToStorage(null, null);
    },
    hydrateFromStorage(state) {
      const { user, token } = loadAuthFromStorage();
      state.user = user;
      state.token = token;
      state.isAuthenticated = Boolean(user && token);
    },
  },
});

export const { setCredentials, logout, hydrateFromStorage } = authSlice.actions;
export default authSlice.reducer;
