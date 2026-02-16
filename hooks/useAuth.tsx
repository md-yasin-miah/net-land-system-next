"use client";

import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout as logoutAction, setCredentials } from "@/store/authSlice";
import type { AuthUser } from "@/store/authSlice";
import { useLoginMutation } from "@/store/api/authApi";
import type { LoginRequest } from "@/store/api/authApi";

export interface UseAuthReturn {
  /** Current user or null if not logged in */
  user: AuthUser | null;
  /** JWT or session token */
  token: string | null;
  /** True when user and token are present */
  isAuthenticated: boolean;
  /** True after initial auth hydration from storage (avoids flash) */
  isHydrated: boolean;
  /** Log in with email and password. Updates store on success. */
  login: (credentials: LoginRequest) => Promise<{ user: AuthUser; token: string }>;
  /** Login mutation loading state */
  isLoggingIn: boolean;
  /** Login mutation error (e.g. invalid credentials) */
  loginError: { status: number; data: { message: string } } | null;
  /** Clear session and redirect to login (call router.push after if needed) */
  logout: () => void;
  /** Set user and token directly (e.g. OAuth or restore session). */
  setCredentials: (payload: { user: AuthUser; token: string }) => void;
}

export function useAuth(): UseAuthReturn {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const token = useAppSelector((s) => s.auth.token);
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  const isHydrated = useAppSelector((s) => s.auth.isHydrated);

  const [loginMutation, { isLoading: isLoggingIn, error: loginMutationError }] =
    useLoginMutation();

  const login = useCallback(
    async (credentials: LoginRequest) => {
      const result = await loginMutation(credentials).unwrap();
      return result;
    },
    [loginMutation]
  );

  const logout = useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch]);

  const setCredentialsAction = useCallback(
    (payload: { user: AuthUser; token: string }) => {
      dispatch(setCredentials(payload));
    },
    [dispatch]
  );

  const loginError =
    loginMutationError && "data" in loginMutationError
      ? (loginMutationError as { status: number; data: { message: string } })
      : null;

  return {
    user,
    token,
    isAuthenticated,
    isHydrated,
    login,
    isLoggingIn,
    loginError,
    logout,
    setCredentials: setCredentialsAction,
  };
}
