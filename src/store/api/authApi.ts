import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import type { AuthUser } from "../authSlice";
import { setCredentials } from "../authSlice";
import { findUserByCredentials } from "@/lib/mockData";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: AuthUser;
  token: string;
}

/** Error shape returned by auth API (required by fakeBaseQuery<AuthApiError>) */
export interface AuthApiError {
  status: number;
  data: { message: string };
}

// RTK Query with fakeBaseQuery for sync mock auth (no real HTTP)
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fakeBaseQuery<AuthApiError>(),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      queryFn: (arg) => {
        const user = findUserByCredentials(arg.email, arg.password);
        if (!user) {
          return {
            error: { status: 401, data: { message: "Invalid email or password" } },
          };
        }
        const token = `mock-jwt-${user.id}-${Date.now()}`;
        return {
          data: { user: user as AuthUser, token },
        };
      },
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials({ user: data.user, token: data.token }));
        } catch {
          // error already returned from queryFn
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
