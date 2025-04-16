import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL } from "../../api.config";
import { DailyJobMetricsResponse, DailyJobsListResponse, PaginationParams, DailyJob } from "../Interfaces/createDailyPlanTypes";

const getJobUniqueId = (job: DailyJob) => {
  return `${job.unitEffectivityNumber}-${job.masterVersionNo}-${job.jobRunDate}-${job.indentNumber}`;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
  }),
  tagTypes: ["MasterDataMetrics", "DailyJobMetrics", "DailyJobs","MasterDataList"],  // Define tags for cache invalidation
  endpoints: (builder) => ({
    login: builder.mutation<any, any>({
      query: (newItem) => ({
        url: "/auth/login",
        method: "POST",
        body: newItem,
      }),
    }),
    getMetrics: builder.query<any, void>({
      query: () => "/master/masterDataMetrics",
      providesTags: ["MasterDataMetrics"],  // This query provides the "MasterDataMetrics" tag
    }),
    listOfCompanies: builder.query<any, string>({
      query: (newItem) => ({
        url: `/master/masterDataList?${newItem}`,
        method: "GET",
      }),
      providesTags: ["MasterDataList"],  // This query also provides the same tag for the master data
    }),
    versionHistory: builder.query<any,  { [key: string]: string | number | boolean }>({
      query: (newItem) => {
        const queryString = Object.entries(newItem)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        return{
        url: `/master/getVersionHistory?${queryString}`,
        method: "GET",
        };
      }, 
    }),
    getJobsList: builder.query<any,  { [key: string]: string | number | boolean }>({
      query: (newItem) => {
        const queryString = Object.entries(newItem)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        return{
        url: `/master/getJobsInMasterData?${queryString}`,
        method: "GET",
        };
      }, 
    }),
    viewMasterData: builder.query<any, { [key: string]: string | number | boolean }>({
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
      invalidatesTags: [
        "MasterDataMetrics",   // Invalidate the metrics query
          "MasterDataList"
      ],
    }),

    getDailyJobMetrics: builder.query<DailyJobMetricsResponse, void>({
      query: () => "/dailyplan/dailyJobMetrics",
      providesTags: ["DailyJobMetrics"],  // This query provides the "DailyJobMetrics" tag
    }),
    getDailyJobsList: builder.query<DailyJobsListResponse, PaginationParams>({
      query: ({ page, size }) => ({
        url: "/dailyplan/dailyJobsDataList",
        params: { page, size },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((job) => ({
                type: "DailyJobs" as const,
                id: getJobUniqueId(job),
              })),
              { type: "DailyJobs", id: "LIST" },
            ]
          : [{ type: "DailyJobs", id: "LIST" }],
    }),
  }),
});

export const {
  useGetMetricsQuery,
  useGetDailyJobMetricsQuery,
  useGetDailyJobsListQuery,
  useListOfCompaniesQuery,
  useLoginMutation,
  useViewMasterDataQuery,
  useCreateMasterDataMutation,
  useVersionHistoryQuery,
  useGetJobsListQuery
} = apiSlice;
