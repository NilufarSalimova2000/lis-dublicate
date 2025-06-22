import { createApi } from "@reduxjs/toolkit/query/react";
import { lisBaseQuery } from "../../../shared/createBaseQuery";
import { AuthPayloadT } from "../../../shared/types/auth";

export const AuthPayloadService = createApi({
  reducerPath: "AuthPayloadService",
  baseQuery: lisBaseQuery,
  endpoints: (builder) => ({
    getAuthPayload: builder.query<AuthPayloadT, void>({
      query: () => `/auth-payload`,
    }),
  }),
});

export const { useGetAuthPayloadQuery, useLazyGetAuthPayloadQuery } =
AuthPayloadService;
