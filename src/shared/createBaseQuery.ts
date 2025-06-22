import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

const organizationId = localStorage.getItem("organization_uuid");

const createBaseQueryWithAuth = (
  baseUrl: string
): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = Cookies.get("access_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("organization-id", organizationId as string);
      return headers;
    },
  });

  return async (args, api, extraOptions) => {
    const result = await rawBaseQuery(args, api, extraOptions);
    if (result.error?.status === 401 || result.error?.status === 403) {
      Cookies.remove("access_token");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    }
    return result;
  };
};

export const ssoBaseQuery = createBaseQueryWithAuth(
  import.meta.env.VITE_SSO_BASE_URI
);
export const lisBaseQuery = createBaseQueryWithAuth(
  import.meta.env.VITE_BASE_API_URL
);
