
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL } from "../../api.config";
import { DailyJobMetricsResponse , DailyJobsListResponse, PaginationParams ,DailyJob} from "../Interfaces/createDailyPlanTypes";


interface Item {
  id: number;
  name: string;
}
const getJobUniqueId = (job: DailyJob) => {
  return `${job.unitEffectivityNumber}-${job.masterVersionNo}-${job.jobRunDate}-${job.indentNumber}`;
};

export const apiSlice = createApi({
  reducerPath: "api", 
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
  }),
  tagTypes: ["Item","DailyJobMetrics",'DailyJobs'], 
  endpoints: (builder) => ({
    getItems: builder.query<Item[], void>({
      query: () => "api/master/masterDataMetrics",
      providesTags: ["Item"], 
    }),
    addItem: builder.mutation<Item, Partial<Item>>({
      query: (newItem) => ({
        url: "/items",
        method: "POST",
        body: newItem,
      }),
      invalidatesTags: ["Item"], //  Refetch "getItems" after adding an item
    }),
    updateItem: builder.mutation<Item, Partial<Item>>({
      query: ({ id, ...updatedItem }) => ({
        url: `/items/${id}`,
        method: "PUT",
        body: updatedItem,
      }),
      invalidatesTags: ["Item"], //  Refetch "getItems" after updating an item
    }),
    deleteItem: builder.mutation<void, number>({
      query: (id) => ({
        url: `/items/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Item"], //  Refetch "getItems" after deleting an item
    }),
    getDailyJobMetrics: builder.query<DailyJobMetricsResponse, void>({
      query: () => '/dailyplan/dailyJobMetrics',
      providesTags: ['DailyJobMetrics']
    }),
    getDailyJobsList: builder.query<DailyJobsListResponse, PaginationParams>({
      query: ({ page, size }) => ({
        url: '/dailyplan/dailyJobsDataList',
        params: { page, size },
      }),
      providesTags: (result) =>
        result
          ? [
              // Generate unique tags for each item
              ...result.data.map((job) => ({
                type: 'DailyJobs' as const,
                id: getJobUniqueId(job),
              })),
              // Always include list tag
              { type: 'DailyJobs', id: 'LIST' },
            ]
          : [{ type: 'DailyJobs', id: 'LIST' }],
    }),
  }),
});

export const { useGetItemsQuery, useAddItemMutation, useUpdateItemMutation, useDeleteItemMutation,useGetDailyJobMetricsQuery,useGetDailyJobsListQuery } = apiSlice;
