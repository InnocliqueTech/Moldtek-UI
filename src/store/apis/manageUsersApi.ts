import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL } from "../../api.config";
import Users from "../../Pages/Users";

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
  roles: number[];
  fromDate: string;
  toDate: string;
  page: number;
  size: number
}

export const manageUsersApis = createApi({
  reducerPath: "manageUsersApis",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
  }),
  tagTypes: ['User'],
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
    })
  }),

});

export const {
  useCreateUserMutation,
  useUpdateUserMutation,
   useGetUsersMutation,
} = manageUsersApis;