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
     prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["KLDMasterDataMetrics", "KLDMasterDataList"],
  endpoints: (builder) => ({
    getKLDmetrics: builder.query<KLDResponse, void>({
      query: () => "kld/kld-metrics",
      providesTags: ["KLDMasterDataMetrics"],
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
        invalidatesTags: ["KLDMasterDataMetrics", "KLDMasterDataList"],
      }),
    }),
    updateKldData: builder.mutation<any, any>({
      query: (newItem) => ({
        url: "/kld/updateKld",
        method: "POST",
        body: newItem,
        invalidatesTags: ["KLDMasterDataMetrics", "KLDMasterDataList"],
      }),
    }),
    getKLDData: builder.mutation<any, any>({
      query: (newItem) => ({
        url: "/kld/getAllKldMasterData",
        method: "POST",
        body: newItem,
        providesTags: ["KLDMasterDataList"],
      }),
    }),
    kldUpload: builder.mutation<any, { file: File }>({
      query: ({ file }) => {
        const formData = new FormData();
        formData.append("file", file);
        return {
          url: "/kld/importKldExcel",
          method: "POST",
          body: formData,
        };
      },
    }),
     kldDelete: builder.mutation<any, any>({
      query: (newItem) => ({
        url: "/kld/deleteKld",
        method: "Delete",
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
  useKldUploadMutation,
  useKldDeleteMutation,
} = kldApi;
