import { createApi } from "@reduxjs/toolkit/query/react";
import { IBaseResponse, IPagination } from "../../../../shared/types/common";
import { lisBaseQuery } from "../../../../shared/createBaseQuery";
import {
  BiomaterialRequestT,
  BiomaterialType,
  BiomaterialUpdateT,
} from "../../../../shared/types/analyse";

export const BiomaterialService = createApi({
  reducerPath: "BiomaterialService",
  baseQuery: lisBaseQuery,
  endpoints: (builder) => ({
    getBiomaterial: builder.query<IBaseResponse<BiomaterialType>, IPagination>({
      query: ({ ...data }) => ({
        url: `/type-biomaterial/list-search`,
        method: "POST",
        body: { ...data },
      }),
    }),

    createBiomaterial: builder.mutation<BiomaterialType, BiomaterialRequestT>({
      query: ({ ...data }) => ({
        url: `/type-biomaterial`,
        method: "POST",
        body: { ...data },
      }),
    }),

    deleteBiomaterial: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/type-biomaterial/${id}`,
        method: "DELETE",
        responseHandler: "text" as any,
      }),
      transformResponse: (response: string) => {
        return { message: response };
      },
    }),

    editBiomaterial: builder.mutation<BiomaterialType, BiomaterialUpdateT>({
      query: ({ id, data }) => ({
        url: `/type-biomaterial/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetBiomaterialQuery,
  useCreateBiomaterialMutation,
  useDeleteBiomaterialMutation,
  useEditBiomaterialMutation
} = BiomaterialService;
