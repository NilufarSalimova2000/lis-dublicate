import { createApi } from "@reduxjs/toolkit/query/react";
import { lisBaseQuery } from "../../../../shared/createBaseQuery";
import { CitizenRootT, LegalRootT } from "../../../../shared/types/mis";

export const MisService = createApi({
  reducerPath: "MisService",
  baseQuery: lisBaseQuery,
  endpoints: (builder) => ({
    getCitizen: builder.query<CitizenRootT, { nnuzb: string; photo: string }>({
      query: ({ nnuzb, photo }) => `/mis/Citizen?nnuzb=${nnuzb}&photo=${photo}`,
    }),
    getLegalEntity: builder.query<LegalRootT, { tin: string }>({
      query: ({ tin }) => `/mis/LegalEntity?tin=${tin}`,
    }),
  }),
});

export const {
  useGetCitizenQuery,
  useLazyGetCitizenQuery,
  useGetLegalEntityQuery,
  useLazyGetLegalEntityQuery,
} = MisService;
