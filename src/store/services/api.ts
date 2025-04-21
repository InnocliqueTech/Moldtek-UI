import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL } from "../../api.config";
import {
  DailyJobMetricsResponse,
  DailyJobsListResponse,
  PaginationParams,
  DailyJob,
  PrintingReportResponse,
  MakeReadyDetailsResponse,
  LabelCuttingDetailsResponse,
  TravelCardDetailsResponse,
  SaveDailyJobRequest,
  SaveDailyJobResponse,
  LaminationReportResponse ,
  SaveLabelCuttingResponse,
  SaveLabelCuttingRequest,
  SaveTravelCardResponse,
  SaveTravelCardRequest
} from "../Interfaces/createDailyPlanTypes";

const getJobUniqueId = (job: DailyJob) => {
  return `${job.unitEffectivityNumber}-${job.masterVersionNo}-${job.jobRunDate}-${job.indentNumber}`;
};
interface UpdateStatusRequest {
  indentNumber: string;
  status: string;
}

interface UpdateStatusResponse {
  statusCode: number;
  message: string;
}
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
  }),
  tagTypes: [
    "MasterDataMetrics",
    "DailyJobMetrics",
    "DailyJobs",
    "MasterDataList",
    "PrintingReport",
    "MakeReadyDetails",
    "LabelCuttingDetails",
    "TravelCardDetails",
    "SaveDailyJobs",
    "LaminationReport"
  ], 
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
      providesTags: ["MasterDataMetrics"],
    }),
    listOfCompanies: builder.query<any, string>({
      query: (newItem) => ({
        url: `/master/masterDataList?${newItem}`,
        method: "GET",
      }),
      providesTags: ["MasterDataList"],  
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
    updateStatusJob: builder.mutation<UpdateStatusResponse, UpdateStatusRequest>({
      query: ({ indentNumber, status }) => ({
        url: '/dailyplan/updateStatusForJob',
        method: 'GET',
        params: { indentNumber, status },
      }),
      
    }),
    

    createMasterData: builder.mutation<any, any>({
      query: (newItem) => ({
        url: "/master/save",
        method: "POST",
        body: newItem,
      }),
      invalidatesTags: [
        "MasterDataMetrics",  
          "MasterDataList"
      ],
    }),
    masterFilters:builder.mutation<any,any>({
query:(newItem)=>({
  url:'/master/masterDataFilter',
  method: "POST",
  body: newItem,
})
    }),
    dailyPlanFilters:builder.mutation<any,any>({
      query:(newItem)=>({
        url:'/dailyplan/getDailyJobsDataFilters',
        method: "POST",
        body: newItem,
      })
          }),

    getCustomerDtails:builder.query<any, void>({
      query: () => "/master/getCustomerDetails",
    }),
    getLabelTypes:builder.query<any, void>({
      query: () => "/master/getLabelTypeDetails",
    }),
    getDailyJobMetrics: builder.query<DailyJobMetricsResponse, void>({
      query: () => "/dailyplan/dailyJobMetrics",
      providesTags: ["DailyJobMetrics"],  
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
    getPrintingReportDetails: builder.query<PrintingReportResponse, string>({
      query: (jobId) =>
        `/dailyplan/getDailyPlanprintingReportDetails?indentNumber=${jobId}`,
      providesTags: (_result, _error, jobId) => [
        { type: "PrintingReport", id: jobId },
      ],
    }),
    getMakeReadyDetails: builder.query<MakeReadyDetailsResponse, string>({
      query: (jobId) => `/dailyplan/getDailyPlanMakeReadyDetails?indentNumber=${jobId}`,
      providesTags: (_result, _error, jobId) => [
        { type: 'MakeReadyDetails', id: jobId }
      ],
    }),
    getLabelCuttingDetails: builder.query<LabelCuttingDetailsResponse, string>({
      query: (indentNumber) => ({
        url: '/dailyplan/getDailyPlanLabelCuttingDetails',
        params: { indentNumber }
      }),
      providesTags: (_result, _error, indentNumber) => [
        { type: 'LabelCuttingDetails', id: indentNumber }
      ],
    }),
    getTravelCardDetails: builder.query<TravelCardDetailsResponse, string>({
      query: (indentNumber) => ({
        url: '/dailyplan/getDailyPlanTravelCardDetails',
        params: { indentNumber }
      }),
      providesTags: (_result, _error, indentNumber) => [
        { type: 'TravelCardDetails', id: indentNumber }
      ],
    }),
    saveDailyJob: builder.mutation<SaveDailyJobResponse, SaveDailyJobRequest>({
      query: (jobData) => ({
        url: '/dailyplan/saveDailyJob',
        method: 'POST',
        body: jobData,
      }),
      invalidatesTags: ['DailyJobs'], // Invalidates cached job lists
    }),
    getLaminationReportDetails: builder.query<LaminationReportResponse, string>({
      query: (indentNumber) => `/dailyplan/getDailyPlanLaminationReportDetails?indentNumber=${indentNumber}`,
      providesTags: (_result, _error, indentNumber) => [
        { type: 'LaminationReport', id: indentNumber }
      ],
    }),
    saveLabelCuttingDetails: builder.mutation<
      SaveLabelCuttingResponse,
      SaveLabelCuttingRequest
    >({
      query: (labelCuttingData) => ({
        url: '/dailyplan/saveLabelCuttingDetails',
        method: 'POST',
        body: labelCuttingData,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'LabelCuttingDetails', id: arg.indentNumber.toString() },
        "MakeReadyDetails"
      ],
    }),
    saveTravelCardDetails: builder.mutation<SaveTravelCardResponse, SaveTravelCardRequest>({
      query: (travelCardData) => ({
        url: '/dailyplan/saveDailyPlanTravelCardDetails',
        method: 'POST',
        body: travelCardData,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'TravelCardDetails', id: arg.indentNumber.toString() }
      ],
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
  useGetJobsListQuery,
  useGetCustomerDtailsQuery,
  useGetLabelTypesQuery,
  useGetPrintingReportDetailsQuery, 
  useGetMakeReadyDetailsQuery,
  useMasterFiltersMutation,
  useGetLabelCuttingDetailsQuery,
  useGetTravelCardDetailsQuery,
  useDailyPlanFiltersMutation,
  useSaveDailyJobMutation ,
  useGetLaminationReportDetailsQuery,
  useUpdateStatusJobMutation,
  useSaveLabelCuttingDetailsMutation ,
  useSaveTravelCardDetailsMutation
} = apiSlice;
