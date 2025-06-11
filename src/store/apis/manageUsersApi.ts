import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL } from "../../api.config";

interface userCreationDataModel  {
      displayName: string;
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
      userTypeId: number;
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
    updateUser: builder.mutation<any, { userId: number; userData: UserCreationDataModel }>({
      query: ({ userId, userData }) => ({
        url: `/users/updateuser/${userId}`,
        method: 'POST',
        body: userData
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useUpdateUserMutation,
} = manageUsersApis;