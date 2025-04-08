import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface RepeatTableRow {
  repeat: number;
  ups: number;
  tracks: number;
  labels: number;
}
export interface PrintingMachineSettings {
  mountingType: string;
  cylinderTeeth: string;
  tension: number;
  unwinder: number;
  infeed: string;
  outfeed: string;
  rewinder: number;
  staticCharge: number;
  formatCorrect: number;
}

export interface SubstrateTableRow {
  field: string;
  printing: string;
  lamination: string;
}

interface ViewMasterDataState {
  selectedTab: number;
  repeatTableData: RepeatTableRow[];
  substrateTableData: SubstrateTableRow[];
  printingMachineSettings: PrintingMachineSettings[];
}

const initialState: ViewMasterDataState = {
  selectedTab: 0,
  repeatTableData: [
    {
      repeat: 0,
      ups: 0,
      tracks: 0,
      labels: 0,
    },
  ],
  substrateTableData: [
    {
      field: "",
      printing: "",
      lamination: "",
    },
  ],
  printingMachineSettings: [
    {
      mountingType: "",
      cylinderTeeth: "",
      tension: 0,
      unwinder: 0,
      infeed: "",
      outfeed: "",
      rewinder: 0,
      staticCharge: 0,
      formatCorrect: 0,
    },
  ],
};

const viewMasterDataSlice = createSlice({
  name: "viewMasterData",
  initialState,
  reducers: {
    setSelectedTab: (state, action: PayloadAction<number>) => {
      state.selectedTab = action.payload;
    },
    setRepeatTableData: (state, action: PayloadAction<RepeatTableRow[]>) => {
      state.repeatTableData = { ...state.repeatTableData, ...action.payload };
    },
    setSubstrateTableData: (
      state,
      action: PayloadAction<SubstrateTableRow[]>
    ) => {
      state.substrateTableData = {
        ...state.substrateTableData,
        ...action.payload,
      };
    },
    setPrintingMachineSettingsData: (
      state,
      action: PayloadAction<PrintingMachineSettings[]>
    ) => {
      state.printingMachineSettings = {
        ...state.printingMachineSettings,
        ...action.payload,
      };
    },
  },
});

export const { setSelectedTab, setRepeatTableData, setSubstrateTableData,setPrintingMachineSettingsData } =
  viewMasterDataSlice.actions;
export default viewMasterDataSlice.reducer;
