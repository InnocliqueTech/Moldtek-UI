import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface RepeatTableRow {
  repeat_length: number,
  ups: number,
  tracks: number,
  labels_per_meter: number,
}
export interface PrintingMachineSettings {
   machine_settings_id : number,
   job_master_id : number,
   mounting_tape : string,
   cylinder_teeth : number,
   tension : number,
   unwinder : number,
   rewinder : number,
   infeed : number,
   outfeed : number,
   static_charge : number,
   format_correct : number

}

export interface SubstrateTableRow {
  field: string;
  printing: string;
  lamination: string;
}
export interface PrintingInkStationData {
  station_no: number;
  color_pantone: string;
  lf_value: number;
  ink_supplier: string;
  lpcm: number;
  volume: string;
  uv_led: string;
  uv_led_intensity:string
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

export interface  PrintingSubstrateSettings {
  print_substrate_id: number,
  machine_settings_id: number,
  substrate_type: string,
  supplier: string,
  dyne_level: string,
  width: number,
  thickness: number,
  density: number,
  gsm: number
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
job_master_id: number,
   unit_effectivity_number : string,
   customer_name : string,
   customer_logo : string,
   item_code : string,
   brand_description : string,
   jar_cap : string,
   structure : string,
   brand_name : string,
  repeat_length: number,
  ups: number,
  tracks: number,
  labels_per_meter: number,
}

interface ViewMasterDataState {
  selectedTab: number;
  repeatTableData: RepeatTableRow;
  substrateTableData: SubstrateTableRow[];
  printingMachineSettings: PrintingMachineSettings;
  printingInkStatinData: PrintingInkStationData[];
  laminationSettings: LaminationSettings[];
  laminationDetails: LaminationDetail[];
  laminationAdhesive: LaminationAdhesiveDetail[];
  dyePrintingSettings: DyePrintingSettings[];
  viewMasterDataDetails:ViewMasterDataDetails;
  jobListData:JobListData[];
  versionPopup:boolean;
  printingSubstrateSettings: PrintingSubstrateSettings;
}

const initialState: ViewMasterDataState = {
  selectedTab: 0,
  repeatTableData: 
    {
      repeat_length: 0,
      ups: 0,
      tracks: 0,
      labels_per_meter: 0,
    },
  substrateTableData: [
    {
      field: "",
      printing: "",
      lamination: "",
    },
  ],
  printingMachineSettings: 
    {
      machine_settings_id : 0,
      job_master_id : 0,
      mounting_tape : '',
      cylinder_teeth : 0,
      tension : 0,
      unwinder : 0,
      rewinder : 0,
      infeed : 0,
      outfeed : 0,
      static_charge : 0,
      format_correct : 0
    },
  printingInkStatinData: [
    {
      station_no: 0,
      color_pantone: "",
      lf_value: 0,
      ink_supplier: "",
      lpcm: 0,
      volume: "",
      uv_led: "",
      uv_led_intensity:""

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
    job_master_id:  0,
   unit_effectivity_number : "",
   customer_name : "",
   customer_logo : "",
   item_code : "",
   brand_description : "",
   jar_cap : "",
   structure : "",
   brand_name : "",
    repeat_length: 0,
    ups: 0,
    tracks: 0,
    labels_per_meter: 0,
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
  ],
  printingSubstrateSettings:{
    print_substrate_id: 0,
  machine_settings_id: 0,
  substrate_type: "",
  supplier: "",
  dyne_level: "",
  width: 0,
  thickness: 0,
  density: 0,
  gsm: 0
  },
  versionPopup:false
};

const viewMasterDataSlice = createSlice({
  name: "viewMasterData",
  initialState,
  reducers: {
    setSelectedTab: (state, action: PayloadAction<number>) => {
      state.selectedTab = action.payload;
    },
    setRepeatTableData: (state, action: PayloadAction<RepeatTableRow>) => {
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
      action: PayloadAction<PrintingMachineSettings>
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
    setVersionPopup:(state,action:PayloadAction<boolean>)=>{
      state.versionPopup = action.payload
    },
    setPrintingSubstrate:(state,action:PayloadAction<PrintingSubstrateSettings>)=>{
      state.printingSubstrateSettings= action.payload
    }
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
  setViewMasterDataDetails,
  setVersionPopup,
  setPrintingSubstrate
} = viewMasterDataSlice.actions;
export default viewMasterDataSlice.reducer;
