import { createApi } from "@reduxjs/toolkit/query/react";
import { lisBaseQuery } from "../../../../shared/createBaseQuery";
import { IBaseResponse, IPagination } from "../../../../shared/types/common";
import {
  CreateLabrantTestTubeT,
  LabrantTestTubeT,
} from "../../../../shared/types/labrant-test-tube";

export const LabrantTestTubeService = createApi({
  reducerPath: "LabrantTestTubeService",
  baseQuery: lisBaseQuery,
  endpoints: (builder) => ({
    getLabrantTestTube: builder.query<
      IBaseResponse<LabrantTestTubeT>,
      IPagination
    >({
      query: ({ ...data }) => ({
        url: `/labrant-test-tube/list-search`,
        method: "POST",
        body: { ...data },
      }),
    }),

    createLabrantTestTube: builder.mutation<
      LabrantTestTubeT,
      CreateLabrantTestTubeT
    >({
      query: ({ ...data }) => ({
        url: `/labrant-test-tube`,
        method: "POST",
        body: { ...data },
      }),
    }),

    deleteLabrantTestTube: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/labrant-test-tube/${id}`,
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
  useGetLabrantTestTubeQuery,
  useDeleteLabrantTestTubeMutation,
  useCreateLabrantTestTubeMutation,
} = LabrantTestTubeService;
