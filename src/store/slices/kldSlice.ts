import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FiltersPayload {
  fromDate: string;
  toDate: string;
  jarCap: string;
}

export interface KLDRowData {
  unitEffectiveNumber: string;
  jarCap: string;
  itemCode: string;
  kldCode: string;
}

export interface KldData {
  openSliderKld: boolean;
  isSearchTriggered: boolean;
  filtersPayload: FiltersPayload;
  createSlider: boolean;
  kldEdit: boolean;
  debouncedSearchKLD: string;
  rowKldData: KLDRowData;
  kldHeaderUploadButton: boolean;
  kldHeaderUpload: boolean;
  kldSuccessPopup: boolean;
  kldConfirmPopup: boolean;
}

const initialState: KldData = {
  kldHeaderUploadButton: false,
  kldHeaderUpload: false,
  kldSuccessPopup: false,
  kldConfirmPopup: false,
  rowKldData: {
    unitEffectiveNumber: "",
    jarCap: "",
    itemCode: "",
    kldCode: "",
  },
  debouncedSearchKLD: "",
  isSearchTriggered: false,
  openSliderKld: false,
  createSlider: false,
  kldEdit: false,
  filtersPayload: {
    fromDate: "",
    toDate: "",
    jarCap: "",
  },
};

const KldSlice = createSlice({
  name: "kldSlice",
  initialState,
  reducers: {
    setKLDHeaderUploadButton: (state, action: PayloadAction<boolean>) => {
      state.kldHeaderUploadButton = action.payload;
    },
    setKLDHeaderUpload: (state, action: PayloadAction<boolean>) => {
      state.kldHeaderUpload = action.payload;
    },
    setKLDSuccessPopup: (state, action: PayloadAction<boolean>) => {
      state.kldSuccessPopup = action.payload;
    },
    setKLDConfirmPopup: (state, action: PayloadAction<boolean>) => {
      state.kldConfirmPopup = action.payload;
    },
    setDebouncedSearchKLD: (state, action: PayloadAction<string>) => {
      state.debouncedSearchKLD = action.payload;
    },
    setKLDEdit: (state, action: PayloadAction<boolean>) => {
      state.kldEdit = action.payload;
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
    setRowKLDData: (state, action: PayloadAction<KLDRowData>) => {
      state.rowKldData = action.payload;
    },
  },
});

export const {
  setKLDConfirmPopup,
  setKLDSuccessPopup,
  setKLDHeaderUpload,
  setKLDHeaderUploadButton,
  setIsSearchTriggered,
  setDebouncedSearchKLD,
  setOpenSliderKld,
  setFiltersPayload,
  setCreateSlider,
  setKLDEdit,
  setRowKLDData,
} = KldSlice.actions;
export default KldSlice.reducer;
