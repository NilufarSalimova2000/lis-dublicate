import { createApi } from "@reduxjs/toolkit/query/react";
import { IBaseResponse, IOrganization, IPagination } from "../../../../shared/types/common";
import { lisBaseQuery } from "../../../../shared/createBaseQuery";
import { SelectOrganizationT } from "../../../../shared/types/auth";

export const OrganizationService = createApi({
  reducerPath: "OrganizationService",
  baseQuery: lisBaseQuery,
  tagTypes: ["Organization"],
  endpoints: (builder) => ({
    getDepartments: builder.query<SelectOrganizationT[],{ uuid: string}>({
      query: ({uuid}) => `/organization/departments/attached/${uuid}`,
    }),

    getOrganization: builder.mutation<IBaseResponse<IOrganization>, IPagination>({
      query: ({ ...data }) => ({
        url: `/organization/list-search`,
        method: "POST",
        body: { ...data },
      }),
    }),
  }),
});

export const { useGetOrganizationMutation, useGetDepartmentsQuery, useLazyGetDepartmentsQuery } = OrganizationService;
