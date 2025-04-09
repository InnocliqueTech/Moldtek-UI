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
export interface PrintingInkStationData {
  stationNo: number;
  colorPantone: string;
  lfValue: number;
  inkSupplier: string;
  lpcm: number;
  volume: string;
  uvLed: string;
}
export interface LaminationSettings {
  zone1Temp: number;
  zone2Temp: number;
  npPressure: number;
  speed: number;
  lamiSetTension: string;
  rewinderTension: string;
}

export interface LaminationDetail {
  field: string;
  printedFilm: string;
  laminateFilm: string;
}

export interface LaminationAdhesiveDetail {
  field: string;
  code: string;
  brand: string;
  ratio: string;
}
export interface DyePrintingSettings {
  dyeCutMachineType: string;
  machine: string;
  dyeCode: string;
  runSpeed: string;
}
export interface JobListData {
  uen: string;
  segment: string;
  status: string;
  lastUpdated: string;
  lastExecuted: string;
  comment: number;
}
export interface ViewMasterDataDetails {
  uen: string;
  customerName: string;
  customerPicture: string;
  jarCap: string;
  itemCode: string;
  brandPack: string;
  structure: string;
}

interface ViewMasterDataState {
  selectedTab: number;
  repeatTableData: RepeatTableRow[];
  substrateTableData: SubstrateTableRow[];
  printingMachineSettings: PrintingMachineSettings[];
  printingInkStatinData: PrintingInkStationData[];
  laminationSettings: LaminationSettings[];
  laminationDetails: LaminationDetail[];
  laminationAdhesive: LaminationAdhesiveDetail[];
  dyePrintingSettings: DyePrintingSettings[];
  viewMasterDataDetails:ViewMasterDataDetails;
  jobListData:JobListData[];
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
  printingInkStatinData: [
    {
      stationNo: 0,
      colorPantone: "",
      lfValue: 0,
      inkSupplier: "",
      lpcm: 0,
      volume: "",
      uvLed: "",
    },
  ],
  laminationAdhesive: [
    {
      field: "",
      code: "",
      brand: "",
      ratio: "",
    },
  ],
  laminationDetails: [
    {
      field: "",
      printedFilm: "",
      laminateFilm: "",
    },
  ],
  laminationSettings: [
    {
      zone1Temp: 0,
      zone2Temp: 0,
      npPressure: 0,
      speed: 0,
      lamiSetTension: "",
      rewinderTension: "",
    },
  ],
  dyePrintingSettings: [
    {
      dyeCutMachineType: "",
      machine: "",
      dyeCode: "",
      runSpeed: "",
    },
  ],
  viewMasterDataDetails:{
    uen: "",
    customerName: "",
    customerPicture: "",
    jarCap: "",
    itemCode: "",
    brandPack: "",
    structure: "",
  },
  jobListData:[
    {
      uen: "",
      segment: "",
      status: "",
      lastUpdated: "",
      lastExecuted: "",
      comment: 0,
    }
  ]
};

const viewMasterDataSlice = createSlice({
  name: "viewMasterData",
  initialState,
  reducers: {
    setSelectedTab: (state, action: PayloadAction<number>) => {
      state.selectedTab = action.payload;
    },
    setRepeatTableData: (state, action: PayloadAction<RepeatTableRow[]>) => {
      state.repeatTableData = action.payload;
    },
    setSubstrateTableData: (
      state,
      action: PayloadAction<SubstrateTableRow[]>
    ) => {
      state.substrateTableData = action.payload;
    },
    setPrintingMachineSettingsData: (
      state,
      action: PayloadAction<PrintingMachineSettings[]>
    ) => {
      state.printingMachineSettings = action.payload;
    },
    setPrintingInkStationData: (
      state,
      action: PayloadAction<PrintingInkStationData[]>
    ) => {
      state.printingInkStatinData = action.payload;
    },
    setLaminationSettings: (
      state,
      action: PayloadAction<LaminationSettings[]>
    ) => {
      state.laminationSettings = action.payload;
    },
    setLaminationDetails: (
      state,
      action: PayloadAction<LaminationDetail[]>
    ) => {
      state.laminationDetails = action.payload;
    },
    setLaminationAdhesiveDetails: (
      state,
      action: PayloadAction<LaminationAdhesiveDetail[]>
    ) => {
      state.laminationAdhesive = action.payload;
    },
    setDyePrintingSettings: (
      state,
      action: PayloadAction<DyePrintingSettings[]>
    ) => {
      state.dyePrintingSettings = action.payload;
    },
    setJobsListData: (
      state,
      action: PayloadAction<JobListData[]>
    ) => {
      state.jobListData = action.payload;
    },
    setViewMasterDataDetails: (
      state,
      action: PayloadAction<ViewMasterDataDetails>
    ) => {
      state.viewMasterDataDetails = action.payload;
    },
  },
});

export const {
  setSelectedTab,
  setRepeatTableData,
  setSubstrateTableData,
  setPrintingMachineSettingsData,
  setPrintingInkStationData,
  setDyePrintingSettings,
  setLaminationAdhesiveDetails,
  setLaminationDetails,
  setLaminationSettings,
  setJobsListData,
  setViewMasterDataDetails
} = viewMasterDataSlice.actions;
export default viewMasterDataSlice.reducer;
