import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL } from "../../api.config";

export interface KLDData {
  "KLD - SET CODE": number;
  "KLD - JAR CODE": number;
  "KLD - CAP CODE": number;
  Total: number;
}

interface KLDResponse {
  statusCode: number;
  message: string;
  payload: any;
  data: KLDData;
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
    getKLDCode: builder.mutation<any, any>({
      query: (newItem) => ({
        url: "kld/getKldCode",
        method: "POST",
        body: newItem,
      }),
    }),
    kldDataGlobalSearch: builder.mutation<any, any>({
      query: (newItem) => ({
        url: "/kld/globalSearchForKld",
        method: "POST",
        body: newItem,
      }),
    }),
    createKldData: builder.mutation<any, any>({
      query: (newItem) => ({
        url: "/kld/createKld",
        method: "POST",
        body: newItem,
      }),
    }),
    updateKldData: builder.mutation<any, any>({
      query: (newItem) => ({
        url: "/kld/updateKld",
        method: "POST",
        body: newItem,
      }),
    }),
    getKLDData: builder.mutation<any, any>({
      query: (newItem) => ({
        url: "/kld/getAllKldMasterData",
        method: "POST",
        body: newItem,
      }),
    }),
  }),
});

export const {
  useGetKLDmetricsQuery,
  useGetKLDCodeMutation,
  useKldDataGlobalSearchMutation,
  useCreateKldDataMutation,
  useGetKLDDataMutation,
  useUpdateKldDataMutation,
} = kldApi;
