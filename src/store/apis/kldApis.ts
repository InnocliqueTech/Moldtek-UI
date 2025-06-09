import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL } from "../../api.config";

interface KLDResponse {
  statusCode: number;
  message: string;
  payload: null;
  data: {
    "KLD - SET CODE": number;
    "KLD - JAR CODE": number;
    "KLD - CAP CODE": number;
    Total: number;
  };
}

export const kldApi = createApi({
  reducerPath: "kldApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
  }),
  tagTypes: [],
  endpoints: (builder) => ({
    getKLDmetrics: builder.query<KLDResponse, void>({
      query: () => "kld/kld-metrics",
    }),
    getKLDCode:builder.mutation<any, any>({
      query: (newItem) => ({
        url: "kld/getKldCode",
        method: "POST",
        body: newItem,
      }),
    }),
    kldDataGlobalSearch:builder.mutation<any, any>({
      query: (newItem) => ({
        url: "/kld/globalSearchForKld",
        method: "POST",
        body: newItem,
      }),
    }),
  }),
});

export const { useGetKLDmetricsQuery ,useGetKLDCodeMutation,useKldDataGlobalSearchMutation} = kldApi;
