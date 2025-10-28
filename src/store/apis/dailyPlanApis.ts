/* eslint-disable @typescript-eslint/no-explicit-any */
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
  rollNumber:number;
}

interface UpdateStatusResponse {
  statusCode: number;
  message: string;
}


export const dailyPlanApi = createApi({
  reducerPath: "dailyPlanApi",
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
  query: ({ indentNumber, status, rollNumber }) => ({
    url: "/dailyplan/updateStatusForJob",
    method: "POST",
    body: { indentNumber, status, rollNumber },
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
getPrintingReportDetails: builder.mutation<
  PrintingReportResponse,
  { indentNumber: string; rollNumber: number }
>({
  query: ({ indentNumber, rollNumber }) => ({
    url: "/dailyplan/getDailyPlanprintingReportDetails",
    method: "POST",
    body: { indentNumber, rollNumber },
  }),
  invalidatesTags: (_result, _error, { indentNumber }) => [
    { type: "PrintingReport", id: indentNumber },
  ],
}),

getLaminationReportDetails: builder.mutation<
  LaminationReportResponse,
  { indentNumber: string; rollNumber: number }
>({
  query: ({ indentNumber, rollNumber }) => ({
    url: "/dailyplan/getDailyPlanLaminationReportDetails",
    method: "POST",
    body: { indentNumber, rollNumber },
  }),
  invalidatesTags: (_result, _error, { indentNumber }) => [
    { type: "LaminationReport", id: indentNumber },
  ],
}),

getLabelCuttingDetails: builder.mutation<
  LabelCuttingDetailsResponse,
  { indentNumber: string; rollNumber: number }
>({
  query: ({ indentNumber, rollNumber }) => ({
    url: "/dailyplan/getDailyPlanLabelCuttingDetails",
    method: "POST",
    body: { indentNumber, rollNumber },
  }),
  invalidatesTags: (_result, _error, { indentNumber }) => [
    { type: "LabelCuttingDetails", id: indentNumber },
  ],
}),

getTravelCardDetails: builder.mutation<
  TravelCardDetailsResponse,
  { indentNumber: string; rollNumber: number }
>({
  query: ({ indentNumber, rollNumber }) => ({
    url: "/dailyplan/getDailyPlanTravelCardDetails",
    method: "POST",
    body: { indentNumber, rollNumber },
  }),
  invalidatesTags: (_result, _error, { indentNumber }) => [
    { type: "TravelCardDetails", id: indentNumber },
  ],
}),

getMakeReadyDetails: builder.mutation<MakeReadyDetailsResponse, { indentNumber: string; rollNumber: number }>({
  query: ({ indentNumber, rollNumber }) => ({
    url: "/dailyplan/getDailyPlanMakeReadyDetails",
    method: "POST",
    body: { indentNumber: indentNumber, rollNumber: rollNumber },
  }),
  invalidatesTags: (_result, _error, { indentNumber }) => [
    { type: "MakeReadyDetails", id: indentNumber },
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
      invalidatesTags: ["PrintingReport"], 
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
dailyPlanGlobalSearch:builder.mutation<any, any>({
      query: (newItem) => ({
        url: "/dailyplan/globalSearchForDailyJob",
        method: "POST",
        body: newItem,
      }),
    }),


  }),
});

export const {
  useDailyPlanGlobalSearchMutation,
  useGetDailyJobMetricsQuery,
  useGetDailyJobsListQuery,
//  useGetPrintingReportDetailsQuery,
  // useGetMakeReadyDetailsQuery,
  useGetMakeReadyDetailsMutation,
  // useGetLabelCuttingDetailsQuery,
  // useGetTravelCardDetailsQuery,
  useDailyPlanFiltersMutation,
  useSaveDailyJobMutation,
  useGetPrintingReportDetailsMutation,
  useGetLabelCuttingDetailsMutation,
  useGetLaminationReportDetailsMutation,
  useGetTravelCardDetailsMutation,
  // useGetLaminationReportDetailsQuery,
  useUpdateStatusJobMutation,
  useSaveLabelCuttingDetailsMutation,
  useSaveTravelCardDetailsMutation,
  useSavePrintingReportDetailsMutation,
  useSaveLaminationReportDetailsMutation,
  useSaveMakeReadyDetailsMutation
} = dailyPlanApi;
