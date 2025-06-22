import { createApi } from "@reduxjs/toolkit/query/react";
import { IBaseResponse } from "../../../../shared/types/common";
import { lisBaseQuery } from "../../../../shared/createBaseQuery";
import { RegionsType } from "../../../../shared/types/mis";

export const RegionService = createApi({
  reducerPath: "RegionService",
  baseQuery: lisBaseQuery,
  endpoints: (builder) => ({
    getRegions: builder.mutation<IBaseResponse<RegionsType>, any>({
      query: ({ ...data }) => ({
        url: `/regions/list-search`,
        method: "POST",
        body: { ...data },
      }),
    }),
    getDistrict: builder.query<RegionsType[], { id: number }>({
      query: ({ id }) => `/district/get-by-region/${id}`,
    }),
  }),
});

export const {
  useGetRegionsMutation,
  useGetDistrictQuery,
  useLazyGetDistrictQuery,
} = RegionService;
