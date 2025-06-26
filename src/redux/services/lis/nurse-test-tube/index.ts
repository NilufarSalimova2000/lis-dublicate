import { createApi } from "@reduxjs/toolkit/query/react";
import { IBaseResponse, IPagination } from "../../../../shared/types/common";
import { lisBaseQuery } from "../../../../shared/createBaseQuery";
import {
  NurseTestTubeRequestT,
  NurseTestTubeType,
} from "../../../../shared/types/users/nurse-test-tube";

export const NurseTestService = createApi({
  reducerPath: "NurseTestService",
  baseQuery: lisBaseQuery,
  endpoints: (builder) => ({
    getNurseTestTube: builder.mutation<
      IBaseResponse<NurseTestTubeType>,
      { orgId: number } & IPagination
    >({
      query: ({ orgId, ...data }) => ({
        url: `/nurse-test-tube/list-search/${orgId}`,
        method: "POST",
        body: { ...data },
      }),
    }),

    createNurseTestTube: builder.mutation<
      NurseTestTubeType,
      NurseTestTubeRequestT
    >({
      query: ({ orgId, ...data }) => ({
        url: `/nurse-test-tube/${orgId}`,
        method: "POST",
        body: { ...data },
      }),
    }),

    deleteNurseTestTube: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/nurse-test-tube/${id}`,
        method: "DELETE",
        responseHandler: "text" as any,
      }),
      transformResponse: (response: string) => {
        return { message: response };
      },
    }),
  }),
});

export const {
  useGetNurseTestTubeMutation,
  useCreateNurseTestTubeMutation,
  useDeleteNurseTestTubeMutation,
} = NurseTestService;
