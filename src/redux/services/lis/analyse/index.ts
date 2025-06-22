import { createApi } from "@reduxjs/toolkit/query/react";
import { IBaseResponse, IPagination } from "../../../../shared/types/common";
import { lisBaseQuery } from "../../../../shared/createBaseQuery";
import {
  AnalyseCreateT,
  AnalyseListT,
  AnalyseResponseT,
  ApplicationType,
  BiomaterialType,
  LoincType,
} from "../../../../shared/types/analyse";

export const AnalyseService = createApi({
  reducerPath: "AnalyseService",
  baseQuery: lisBaseQuery,
  endpoints: (builder) => ({
    getLoinc: builder.query<
      IBaseResponse<LoincType>,
      { id: number } & IPagination
    >({
      query: ({ id, ...data }) => ({
        url: `/loinc/list-search/${id ?? 1}`,
        method: "POST",
        body: { ...data },
      }),
    }),

    getBiomaterial: builder.query<IBaseResponse<BiomaterialType>, IPagination>({
      query: ({ ...data }) => ({
        url: `/type-biomaterial/list-search`,
        method: "POST",
        body: { ...data },
      }),
    }),

    getAnalyse: builder.query<IBaseResponse<BiomaterialType>, IPagination>({
      query: ({ ...data }) => ({
        url: `/analyse-type/list-search`,
        method: "POST",
        body: { ...data },
      }),
    }),

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

    getApplication: builder.query<IBaseResponse<ApplicationType>, IPagination>({
      query: ({ ...data }) => ({
        url: `/application-type/list-search`,
        method: "POST",
        body: { ...data },
      }),
    }),

    createAnalyse: builder.mutation<AnalyseResponseT, AnalyseCreateT>({
      query: (data) => ({
        url: "/analyse",
        method: "POST",
        body: data,
      }),
    }),

    getPatientAnalyse: builder.mutation<
      IBaseResponse<AnalyseListT>,
      { patientId: number; orgId: number } & IPagination
    >({
      query: ({ patientId, orgId, ...data }) => ({
        url: `/analyse/list-search/${patientId}/${orgId}`,
        method: "POST",
        body: { ...data },
      }),
    }),

    deleteAnalyse: builder.mutation<IBaseResponse<AnalyseListT>, number>({
      query: (id) => ({
        url: `/analyse/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateAnalyseMutation,
  useDeleteAnalyseMutation,
  useGetAnalyseQuery,
  useGetApplicationQuery,
  useGetBiomaterialQuery,
  useGetLoincQuery,
  useGetMeasurementUnitQuery,
  useGetPatientAnalyseMutation,
} = AnalyseService;
