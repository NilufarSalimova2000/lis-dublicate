import { createApi } from "@reduxjs/toolkit/query/react";
import { ssoBaseQuery } from "../../../shared/createBaseQuery";

export const ssoService = createApi({
  reducerPath: "ssoService",
  baseQuery: ssoBaseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<any, any>({
      query: (body) => ({
        url: "/oauth/token",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body,
      }),
    }),
  }),
});

export const { useLoginMutation } = ssoService;
