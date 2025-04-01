// src/services/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the types for your API responses
interface Item {
  id: number;
  name: string;
}

export const apiSlice = createApi({
  reducerPath: 'api', // A unique name for the API slice
  baseQuery: fetchBaseQuery({ baseUrl: 'https://your-api-endpoint.com' }), // Your API URL
  endpoints: (builder) => ({
    getItems: builder.query<Item[], void>({
      query: () => '/items', // Replace with your actual endpoint
    }),
  }),
});

export const { useGetItemsQuery } = apiSlice; // This is the hook you'll use in your
