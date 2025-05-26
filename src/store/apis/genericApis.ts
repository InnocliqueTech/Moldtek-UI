import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL } from "../../api.config";





interface UnitEffectiveNumber {
  unitEffectiveNumber: string;
  customerName: string;
  brandDescription: string;
}
export const genericApi = createApi({
  reducerPath: "genericApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
  }),
tagTypes: [ "UnitEffectiveNumbers"],
  endpoints: (builder) => ({

    subStrateDropDown:builder.mutation<any,any>({
     query:(newItem)=>({
     url:'dailyplan/substrateDropdown',
     method:'POST',
     body:newItem
     }),
    }),
    structureDropdown:builder.mutation<any,any>({
      query:(newItem)=>({
      url:'dailyplan/structureDropdown',
      method:'POST',
      body:newItem
      }),
     }),
     supplierDropdown:builder.mutation<any,any>({
      query:(newItem)=>({
      url:'dailyplan/suppliersDropdown',
      method:'POST',
      body:newItem
      }),
     }),
     mountingTapesDropdown:builder.mutation<any,any>({
      query:(newItem)=>({
      url:'dailyplan/mountingTapesDropdown',
      method:'POST',
      body:newItem
      }),
     }),
     segmentsDropdown:builder.mutation<any,any>({
      query:(newItem)=>({
      url:'dailyplan/segmentsDropdown',
      method:'POST',
      body:newItem
      }),
     }),

     getMachinesByType: builder.query<any, string>({
    query: (machineName) =>
      `/dailyplan/getMachinesByType?machineType=${machineName}`,
  }),
   
    
uploadCustomerFile: builder.mutation<
  any,
  { file: File; unitNumber: string; type: string }
>({
  query: ({ file, unitNumber, type }) => {
    const formData = new FormData();
    formData.append("unitNumber", unitNumber);
    formData.append("file", file);
    formData.append("type", type);

    return {
      url: "dailyplan/uploadFile",
      method: "POST",
      body: formData,
    };
  },
}),

    getCustomerDtails: builder.query<any, void>({
      query: () => "/master/getCustomerDetails",
    }),
    getLabelTypes: builder.query<any, void>({
      query: () => "/master/getLabelTypeDetails",
    }),
    getAllUnitEffectiveNumbers: builder.query<UnitEffectiveNumber[], void>({
      query: () => "/master/getAllUnitEffectiveNumbers",
      providesTags: ["UnitEffectiveNumbers"],
    }),
    generateIndent: builder.query<any, string>({ 
      query: (unitEffectiveNumber) =>
        `/master/generateIndent?unitEffectiveNumber=${unitEffectiveNumber}`,
    }),
  }),
});

export const {
  useGetCustomerDtailsQuery,
  useGetLabelTypesQuery,
  useSubStrateDropDownMutation,
  useGetMachinesByTypeQuery,
  useSegmentsDropdownMutation,
  useStructureDropdownMutation,
  useSupplierDropdownMutation,
  useMountingTapesDropdownMutation,
  useUploadCustomerFileMutation,
  useGetAllUnitEffectiveNumbersQuery,
  useGenerateIndentQuery,
} = genericApi;
