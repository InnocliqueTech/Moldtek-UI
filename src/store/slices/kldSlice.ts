import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FiltersPayload {
  fromDate: string;
  toDate: string;
  customerName: string[];
  labelType: string[];
  searchField: string;
  searchType: string;
  status: string[];
}

export interface viewDailyPlan {
  openSliderKld: boolean;
  isSearchTriggered: boolean;
  filtersPayload: FiltersPayload;
  createSlider: boolean;
  kldEdit:boolean;
}

const initialState: viewDailyPlan = {
  isSearchTriggered: false,
  openSliderKld: false,
  createSlider: false,
  kldEdit:false,
  filtersPayload: {
    fromDate: "",
    toDate: "",
    customerName: [],
    labelType: [],
    searchField: "",
    searchType: "",
    status: [],
  },
};

const KldSlice = createSlice({
  name: "kldSlice",
  initialState,
  reducers: {
    setKLDEdit:(state,action:PayloadAction<boolean>)=>{
    state.kldEdit = action.payload
    },
    setCreateSlider: (state, action: PayloadAction<boolean>) => {
      state.createSlider = action.payload;
    },
    setOpenSliderKld: (state, action: PayloadAction<boolean>) => {
      state.openSliderKld = action.payload;
    },
    setIsSearchTriggered: (state, action: PayloadAction<boolean>) => {
      state.isSearchTriggered = action.payload;
    },
    setFiltersPayload: (state, action: PayloadAction<FiltersPayload>) => {
      state.filtersPayload = action.payload;
    },
  },
});

export const { setIsSearchTriggered, setOpenSliderKld, setFiltersPayload,setCreateSlider,setKLDEdit } =
  KldSlice.actions;
export default KldSlice.reducer;
