import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL } from "../../api.config";


export const masterDataApi = createApi({
  reducerPath: "masterDataApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
  }),
  tagTypes: [
    "MasterDataMetrics",
    "MasterDataList"],
  endpoints: (builder) => ({
    getMetrics: builder.query<any, void>({
      query: () => "/master/masterDataMetrics",
      providesTags: ["MasterDataMetrics"],
    }),
    listOfCompanies: builder.query<any, string>({
      query: (newItem) => ({
        url: `/master/masterDataList?${newItem}`,
        method: "GET",
      }),
      providesTags: ["MasterDataList"],
    }),
    versionHistory: builder.query<
      any,
      { [key: string]: string | number | boolean }
    >({
      query: (newItem) => {
        const queryString = Object.entries(newItem).map(
          ([key, value]) => `${key}=${encodeURIComponent(value)}`
        );
        return {
          url: `/master/getVersionHistory?${queryString}`,
          method: "GET",
        };
      },
    }),
    getJobsList: builder.query<
      any,
      { [key: string]: string | number | boolean }
    >({
      query: (newItem) => {
        const queryString = Object.entries(newItem).map(
          ([key, value]) => `${key}=${encodeURIComponent(value)}`
        );
        return {
          url: `/master/getJobsInMasterData?${queryString}`,
          method: "GET",
        };
      },
    }),
    viewMasterData: builder.query<
      any,
      { [key: string]: string | number | boolean }
    >({
      query: (newItem) => {
        const queryString = Object.entries(newItem)
          .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
          .join("&");

        return {
          url: `/master/getMasterDetails?${queryString}`,
          method: "GET",
        };
      },
    }),
    createMasterData: builder.mutation<any, any>({
      query: (newItem) => ({
        url: "/master/save",
        method: "POST",
        body: newItem,
      }),
      invalidatesTags: ["MasterDataMetrics", "MasterDataList"],
    }),
    masterFilters: builder.mutation<any, any>({
      query: (newItem) => ({
        url: "/master/masterDataFilter",
        method: "POST",
        body: newItem,
      }),
    }),
   masterDataNotifications: builder.query<any, void>({   // <-- use void here
  query: () => ({
    url: `/master/getNotificationForUpload`,
    method: "GET",
  }),
}),

}),
});

export const {
  useGetMetricsQuery,
  useListOfCompaniesQuery,
  useViewMasterDataQuery,
  useCreateMasterDataMutation,
  useVersionHistoryQuery,
  useGetJobsListQuery,
  useMasterFiltersMutation,
  useMasterDataNotificationsQuery,
  useLazyMasterDataNotificationsQuery
} = masterDataApi;
