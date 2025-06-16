import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL } from "../../api.config";

interface userCreationDataModel {
  displayName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string | null;
  userTypeId: number;
}

interface getUsersPayload {
  email: string;
  roles: string[];
  fromDate: string;
  toDate: string;
  page: number;
  size: number
}

interface UserMetricResponse {
  statusCode: number;
  message: string;
  payload: null;
  data: {
    totalUsers: number | null;
    inactiveUsers: number | null;
    activeUsers: number | null
  }

}

export const manageUsersApis = createApi({
  reducerPath: "manageUsersApis",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
  }),
  tagTypes: ["User", "UserMetrics"],
  endpoints: (builder) => ({
    createUser: builder.mutation<any, userCreationDataModel>({
      query: (userData) => ({
        url: '/users/create',
        method: 'POST',
        body: userData
      }),
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation<any, { userId: number; userData: userCreationDataModel }>({
      query: ({ userId, userData }) => ({
        url: `/users/updateuser/${userId}`,
        method: 'POST',
        body: userData
      }),
      invalidatesTags: ['User'],
    }),
    getUsers: builder.mutation<any, getUsersPayload>({
      query: (params) => ({
        url: '/users/getUsers',
        method: 'POST',
        body: params
      }),
      transformResponse: (response: any) => {
        return {
          totalRecords: response.data.totalItems,
          data: response.data.users,
        }
      },

    }),
    deactivateUser: builder.mutation<
      void,
      { userId: string; isActive: boolean }
    >({
      query: ({ userId, isActive }) => ({
        url: `/users/update-status?userId=${userId}&isActive=${isActive}`,
        method: "POST",
      }),
      invalidatesTags: ['User'],
    }),
    getUserMetrics: builder.query <UserMetricResponse, void>({
      query : () => "/users/getUserMetrics",
      providesTags:["UserMetrics"]
    }),
    userDataGlobalMutation:builder.mutation<any, any>({
      query:(newItem) => ({
        url: "/users/global-search",
        method:"POST",
        body:newItem
      })
    })
  }),
});

export const {
  useCreateUserMutation,
  useUpdateUserMutation,
  useGetUsersMutation,
  useDeactivateUserMutation,
  useGetUserMetricsQuery,
  useUserDataGlobalMutationMutation
} = manageUsersApis;