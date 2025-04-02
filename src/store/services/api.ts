// src/services/api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the types for your API responses
interface Item {
  id: number;
  name: string;
}

export const apiSlice = createApi({
  reducerPath: "api", // A unique name for the API slice
  baseQuery: fetchBaseQuery({ baseUrl: "https://your-api-endpoint.com" }), // API URL
  tagTypes: ["Item"], //  Define a tag for the Item resource
  endpoints: (builder) => ({
    getItems: builder.query<Item[], void>({
      query: () => "/items", // Replace with  actual endpoint
      providesTags: ["Item"], //  Marks this query with the "Item" tag
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
  }),
});

export const { useGetItemsQuery, useAddItemMutation, useUpdateItemMutation, useDeleteItemMutation } = apiSlice;
