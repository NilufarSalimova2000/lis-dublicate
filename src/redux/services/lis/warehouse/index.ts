import { createApi } from "@reduxjs/toolkit/query/react";
import { IBaseResponse, IPagination } from "../../../../shared/types/common";
import { lisBaseQuery } from "../../../../shared/createBaseQuery";
import { IWarehouse } from "../../../../shared/types/warehouse";

export const WarehouseService = createApi({
  reducerPath: "WarehouseService",
  baseQuery: lisBaseQuery,
  endpoints: (builder) => ({
    getWarehouses: builder.mutation<
      IBaseResponse<IWarehouse>,
      { orgId: number } & IPagination
    >({
      query: ({ orgId, ...data }) => ({
        url: `/warehouse/item/list-search/${orgId}`,
        method: "POST",
        body: { ...data },
      }),
    }),

    getWarehouse: builder.query<IWarehouse, number>({
      query: (id) => `/warehouse/item/${id}`,
    }),

    createWarehouse: builder.mutation<IBaseResponse<IWarehouse>, any>({
      query: (data) => ({
        url: "/warehouse/item/15",
        method: "POST",
        body: data,
      }),
    }),

    updateWarehouse: builder.mutation<
      IBaseResponse<IWarehouse>,
      { id: number; data: IWarehouse }
    >({
      query: ({ id, data }) => ({
        url: `/warehouse/item/${id}/15`,
        method: "PUT",
        body: data,
      }),
    }),

    deleteWarehouse: builder.mutation<IBaseResponse<IWarehouse>, number>({
      query: (id) => ({
        url: `/warehouse/item/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateWarehouseMutation,
  useDeleteWarehouseMutation,
  useGetWarehouseQuery,
  useGetWarehousesMutation,
  useUpdateWarehouseMutation,
} = WarehouseService;
