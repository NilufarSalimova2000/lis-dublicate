import { createApi } from "@reduxjs/toolkit/query/react";
import { IBaseResponse, IPagination } from "../../../../shared/types/common";
import { lisBaseQuery } from "../../../../shared/createBaseQuery";
import {
  ResMeasurUnitRequestT,
  ResMeasurUnitT,
  ResMeasurUnitUpdateT,
} from "../../../../shared/types/result-measurement-unit";

export const ResMeasurUnitService = createApi({
  reducerPath: "ResMeasurUnitService",
  baseQuery: lisBaseQuery,
  endpoints: (builder) => ({
    getResMeasur: builder.query<IBaseResponse<ResMeasurUnitT>, IPagination>({
      query: ({ ...data }) => ({
        url: `/result-measurement-unit/list-search`,
        method: "POST",
        body: { ...data },
      }),
    }),

    createResMeasur: builder.mutation<ResMeasurUnitT, ResMeasurUnitRequestT>({
      query: ({ ...data }) => ({
        url: `/result-measurement-unit`,
        method: "POST",
        body: { ...data },
      }),
    }),

    deleteResMeasur: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/result-measurement-unit/${id}`,
        method: "DELETE",
        responseHandler: "text" as any,
      }),
      transformResponse: (response: string) => {
        return { message: response };
      },
    }),

    editResMeasur: builder.mutation<ResMeasurUnitT, ResMeasurUnitUpdateT>({
      query: ({ id, data }) => ({
        url: `/result-measurement-unit/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetResMeasurQuery,
  useCreateResMeasurMutation,
  useDeleteResMeasurMutation,
  useEditResMeasurMutation,
} = ResMeasurUnitService;
