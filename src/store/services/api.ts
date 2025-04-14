
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL } from "../../api.config";


interface Item {
  id: number;
  name: string;
}

export const apiSlice = createApi({
  reducerPath: "api", 
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
  }),
  tagTypes: ["Item"], 
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
  }),
});

export const { useGetItemsQuery, useAddItemMutation, useUpdateItemMutation, useDeleteItemMutation } = apiSlice;
