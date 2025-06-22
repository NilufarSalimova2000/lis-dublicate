import { createApi } from "@reduxjs/toolkit/query/react";
import { ssoBaseQuery } from "../../../shared/createBaseQuery";
import { ILogoutResponse } from "../../../shared/types/auth";

export const logoutService = createApi({
  reducerPath: "logoutService",
  baseQuery: ssoBaseQuery,
  endpoints: (builder) => ({
    createLogout: builder.mutation<ILogoutResponse, void>({
      query: () => ({
        url: "/api/auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useCreateLogoutMutation } = logoutService;
