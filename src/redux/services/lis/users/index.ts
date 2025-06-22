import { createApi } from "@reduxjs/toolkit/query/react";
import { IBaseResponse, IPagination } from "../../../../shared/types/common";
import { UsersType } from "../../../../shared/types/users";
import { lisBaseQuery } from "../../../../shared/createBaseQuery";

export const UsersService = createApi({
  reducerPath: "UsersService",
  baseQuery: lisBaseQuery,
  endpoints: (builder) => ({
    getUsers: builder.mutation<
      IBaseResponse<UsersType>,
      { orgId: number } & IPagination
    >({
      query: ({ orgId, ...data }) => ({
        url: `user/list-search/${orgId ?? 1}`,
        method: "POST",
        body: { ...data },
      }),
    }),

    getPatients: builder.mutation<
      IBaseResponse<UsersType>,
      { orgId: number } & IPagination
    >({
      query: ({ orgId, ...data }) => ({
        url: `user/list-search-patient/${orgId ?? 1}`,
        method: "POST",
        body: { ...data },
      }),
    }),

    getWfaPatients: builder.mutation<
      IBaseResponse<UsersType>,
      { orgId: number } & IPagination
    >({
      query: ({ orgId, ...data }) => ({
        url: `user/list-search-wfa-patient/${orgId ?? 1}`,
        method: "POST",
        body: { ...data },
      }),
    }),
  }),
});

export const {
  useGetUsersMutation,
  useGetPatientsMutation,
  useGetWfaPatientsMutation,
} = UsersService;
