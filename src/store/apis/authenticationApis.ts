import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL } from "../../api.config";

export const authenticationApi = createApi({
  reducerPath: "AthenticationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
  }),

  endpoints: (builder) => ({
    login: builder.mutation<any, any>({
      query: (newItem) => ({
        url: "/auth/login",
        method: "POST",
        body: newItem,
      }),
    }),
    forGotPassword: builder.mutation<any, any>({
      query: (newItem) => ({
        url: "auth/forgotPassword",
        method: "POST",
        body: newItem,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useForGotPasswordMutation,
} = authenticationApi;
