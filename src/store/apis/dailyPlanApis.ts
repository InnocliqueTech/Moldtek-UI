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
  LaminationReportResponse,
  SaveLabelCuttingResponse,
  SaveLabelCuttingRequest,
  SaveTravelCardResponse,
  SaveTravelCardRequest,
  SaveMakeReadyRequest,
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


export const dailyPlanApi = createApi({
  reducerPath: "dailyPlanApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
  }),
  tagTypes: [
    "DailyJobMetrics",
    "DailyJobs",
    "PrintingReport",
    "MakeReadyDetails",
    "LabelCuttingDetails",
    "TravelCardDetails",
    "SaveDailyJobs",
    "LaminationReport",
    "LaminationReportDetails",
    "UnitEffectiveNumbers",
  ],
  endpoints: (builder) => ({
    updateStatusJob: builder.mutation<
      UpdateStatusResponse,
      UpdateStatusRequest
    >({
      query: ({ indentNumber, status }) => ({
        url: "/dailyplan/updateStatusForJob",
        method: "GET",
        params: { indentNumber, status },
      }),
    }),

    dailyPlanFilters: builder.mutation<any, any>({
      query: (newItem) => ({
        url: "/dailyplan/getDailyJobsDataFilters",
        method: "POST",
        body: newItem,
      }),
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
      query: (jobId) =>
        `/dailyplan/getDailyPlanMakeReadyDetails?indentNumber=${jobId}`,
      providesTags: (_result, _error, jobId) => [
        { type: "MakeReadyDetails", id: jobId },
      ],
    }),
    getLabelCuttingDetails: builder.query<LabelCuttingDetailsResponse, string>({
      query: (indentNumber) => ({
        url: "/dailyplan/getDailyPlanLabelCuttingDetails",
        params: { indentNumber },
      }),
      providesTags: (_result, _error, indentNumber) => [
        { type: "LabelCuttingDetails", id: indentNumber },
      ],
    }),
    getTravelCardDetails: builder.query<TravelCardDetailsResponse, string>({
      query: (indentNumber) => ({
        url: "/dailyplan/getDailyPlanTravelCardDetails",
        params: { indentNumber },
      }),
      providesTags: (_result, _error, indentNumber) => [
        { type: "TravelCardDetails", id: indentNumber },
      ],
    }),
    saveDailyJob: builder.mutation<SaveDailyJobResponse, SaveDailyJobRequest>({
      query: (jobData) => ({
        url: "/dailyplan/saveDailyJob",
        method: "POST",
        body: jobData,
      }),
      invalidatesTags: ["DailyJobs"], // Invalidates cached job lists
    }),
    getLaminationReportDetails: builder.query<LaminationReportResponse, string>(
      {
        query: (indentNumber) =>
          `/dailyplan/getDailyPlanLaminationReportDetails?indentNumber=${indentNumber}`,
        providesTags: (_result, _error, indentNumber) => [
          { type: "LaminationReport", id: indentNumber },
        ],
      }
    ),

    saveLaminationReportDetails: builder.mutation<any, any>({
      query: (laminationReportData) => ({
        url: "/dailyplan/saveLaminationReport",
        method: "POST",
        body: laminationReportData,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "LaminationReportDetails", id: arg.indentNumber.toString() },
      ],
    }),
    saveLabelCuttingDetails: builder.mutation<
      SaveLabelCuttingResponse,
      SaveLabelCuttingRequest
    >({
      query: (labelCuttingData) => ({
        url: "/dailyplan/saveLabelCuttingDetails",
        method: "POST",
        body: labelCuttingData,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "LabelCuttingDetails", id: arg.indentNumber.toString() },
        "MakeReadyDetails",
      ],
    }),
    saveTravelCardDetails: builder.mutation<
      SaveTravelCardResponse,
      SaveTravelCardRequest
    >({
      query: (travelCardData) => ({
        url: "/dailyplan/saveDailyPlanTravelCardDetails",
        method: "POST",
        body: travelCardData,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "TravelCardDetails", id: arg.indentNumber.toString() },
      ],
    }),
    savePrintingReportDetails: builder.mutation<
      { statusCode: number; message: string; payload: null; data: string },
      any
    >({
      query: (reportData) => ({
        url: "/dailyplan/updateDailyPlanPrintingReportDetails",
        method: "POST",
        body: reportData,
      }),
      invalidatesTags: ["PrintingReport"], // Optional: adjust if needed
    }),
    saveMakeReadyDetails: builder.mutation<
      SaveTravelCardResponse,
      SaveMakeReadyRequest
    >({
      query: (payload) => ({
        url: "/dailyplan/updateDailyPlanMakeReadyDetails",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: (_result, _error, arg) => [
        {
          type: "MakeReadyDetails",
          id: arg?.dailyPlan?.indentNumber?.toString(),
        },
      ],
    }),
      dailyPlanNotifications: builder.query<any, void>({   
  query: () => ({
    url: `/dailyplan/getJobUploadNotifications?all=false`,
    method: "GET",
  }),
}),


  }),
});

export const {
  useGetDailyJobMetricsQuery,
  useGetDailyJobsListQuery,
  useGetPrintingReportDetailsQuery,
  useGetMakeReadyDetailsQuery,
  useGetLabelCuttingDetailsQuery,
  useGetTravelCardDetailsQuery,
  useDailyPlanFiltersMutation,
  useSaveDailyJobMutation,
  useGetLaminationReportDetailsQuery,
  useUpdateStatusJobMutation,
  useSaveLabelCuttingDetailsMutation,
  useSaveTravelCardDetailsMutation,
  useSavePrintingReportDetailsMutation,
  useSaveLaminationReportDetailsMutation,
  useSaveMakeReadyDetailsMutation,
  useDailyPlanNotificationsQuery,
  useLazyDailyPlanNotificationsQuery
} = dailyPlanApi;
