import { createApi } from "@reduxjs/toolkit/query/react";
import { IBaseResponse, IPagination } from "../../../../shared/types/common";
import { lisBaseQuery } from "../../../../shared/createBaseQuery";
import {
  BiomaterialRequestT,
  BiomaterialType,
  BiomaterialUpdateT,
} from "../../../../shared/types/analyse";

export const MeasurementUnitService = createApi({
  reducerPath: "MeasurementUnitService",
  baseQuery: lisBaseQuery,
  endpoints: (builder) => ({
    getMeasurementUnit: builder.query<
      IBaseResponse<BiomaterialType>,
      IPagination
    >({
      query: ({ ...data }) => ({
        url: `/measurement-unit/list-search`,
        method: "POST",
        body: { ...data },
      }),
    }),

    createMeasurementUnit: builder.mutation<
      BiomaterialType,
      BiomaterialRequestT
    >({
      query: ({ ...data }) => ({
        url: `/measurement-unit`,
        method: "POST",
        body: { ...data },
      }),
    }),

    deleteMeasurementUnit: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/measurement-unit/${id}`,
        method: "DELETE",
        responseHandler: "text" as any,
      }),
      transformResponse: (response: string) => {
        return { message: response };
      },
    }),

    editMeasurementUnit: builder.mutation<BiomaterialType, BiomaterialUpdateT>({
      query: ({ id, data }) => ({
        url: `/measurement-unit/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetMeasurementUnitQuery,
  useCreateMeasurementUnitMutation,
  useDeleteMeasurementUnitMutation,
  useEditMeasurementUnitMutation,
} = MeasurementUnitService;
