import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface RepeatTableRow {
  repeat_length: number;
  ups: number;
  tracks: number;
  labels_per_meter: number;
}
export interface PrintingMachineSettings {
  machine_settings_id: number;
  job_master_id: number;
  printing_machine_name: string;
  cylinder_teeth: number;
  tension: number;
  unwinder: number;
  rewinder: number;
  infeed: number;
  outfeed: number;
  static_charge: number;
  format_correct: number;
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
  uv_led_intensity: string;
  mixing_on_gec:string;
  mptl_code:string;
  mounting_tape:string;
}
export interface LaminationSettings {
  zone1_temp: number;
  zone2_temp: number;
  nip_pressure_bar: number;
  speed: number;
  lami_set_tension: string;
  rewinder_tension: string;
  printed_film_tension: string;
  laminate_film_tension: string;
  viscosity_range: string;
  adhesive_gsm: string;
  composite_gsm: string;
}

export interface LaminationDetail {
  field: string;
  printedFilm: string;
  laminateFilm: string;
}

export interface LaminationAdhesiveDetail {
  type: string;
  code: string;
  brand: string;
  ratio: number;
}

export interface DyeCuttingSettings {
  machine_type: string;
  machine_name: string;
  dye_code: string;
  run_speed: number;
}

export interface PrintingSubstrateSettings {
  print_substrate_id: number;
  machine_settings_id: number;
  substrate_type: string;
  supplier: string;
  dyne_level: string;
  width: number;
  thickness: number;
  density: number;
  gsm: number;
}
export interface LaminatingSubstrateSettings {
  substrate_id: number;
  lamination_id: number;
  substrate_type: string;
  supplier: string;
  dyne_level: string;
  width: number;
  thickness: number;
  density: number;
  gsm: number;
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
  job_master_id: number;
  unit_effectivity_number: string;
  customer_name: string;
  customer_logo: string | null;
  item_code: string | null;
  brand_description: string;
  jar_cap: string;
  structure: string | null;
  repeat_length: number;
  ups: number;
  tracks: number;
  label_type: string;
  labels_per_meter:number;
}

interface ViewMasterDataState {
  selectedTab: number;
  repeatTableData: RepeatTableRow;
  substrateTableData: SubstrateTableRow[];
  printingMachineSettings: PrintingMachineSettings;
  printingInkStatinData: PrintingInkStationData[];
  laminationSettings: LaminationSettings;
  laminationDetails: LaminationDetail[];
  laminationAdhesive: LaminationAdhesiveDetail[];
  dyeCuttingSettings: DyeCuttingSettings;
  viewMasterDataDetails: ViewMasterDataDetails;
  jobListData: JobListData[];
  versionPopup: boolean;
  printingSubstrateSettings: PrintingSubstrateSettings;
  laminatingSubstrateSettings: LaminatingSubstrateSettings;
}

const initialState: ViewMasterDataState = {
  selectedTab: 0,
  repeatTableData: {
    repeat_length: 0,
    ups: 0,
    tracks: 0,
    labels_per_meter: 0,
  },
  substrateTableData: [
    {
      field: "--",
      printing: "--",
      lamination: "--",
    },
  ],
  printingMachineSettings: {
    machine_settings_id: 0,
    job_master_id: 0,
    printing_machine_name: "--",
    cylinder_teeth: 0,
    tension: 0,
    unwinder: 0,
    rewinder: 0,
    infeed: 0,
    outfeed: 0,
    static_charge: 0,
    format_correct: 0,
  },
  printingInkStatinData: [
    {
      station_no: 0,
      color_pantone: "--",
      lf_value: 0,
      ink_supplier: "--",
      lpcm: 0,
      volume: "--",
      uv_led: "--",
      uv_led_intensity: "--",
      mounting_tape:"--",
      mptl_code:"--",
      mixing_on_gec:'--'
    },
  ],
  laminationAdhesive: [
    {
      type: "--",
      code: "--",
      brand: "--",
      ratio: 0,
    },
  ],
  laminationDetails: [
    {
      field: "--",
      printedFilm: "--",
      laminateFilm: "--",
    },
  ],
  laminationSettings: {
    zone1_temp: 0,
    zone2_temp: 0,
    nip_pressure_bar: 0,
    speed: 0,
    lami_set_tension: "--",
    rewinder_tension: "--",
    printed_film_tension: "--",
    laminate_film_tension: "--",
    viscosity_range: "--",
    adhesive_gsm: "--",
    composite_gsm: "--",
  },
  dyeCuttingSettings: {
    machine_type: "--",
    machine_name: "--",
    dye_code: "--",
    run_speed: 0,
  },
  viewMasterDataDetails: {
    job_master_id: 0,
    unit_effectivity_number: "--",
    customer_name: "--",
    customer_logo: "--",
    item_code: "--",
    brand_description: "--",
    jar_cap: "--",
    structure: "--",
    repeat_length: 0,
    ups: 0,
    tracks: 0,
    label_type: "",
    labels_per_meter:0
  },
  jobListData: [
    {
      uen: "--",
      segment: "--",
      status: "--",
      lastUpdated: "--",
      lastExecuted: "--",
      comment: 0,
    },
  ],
  printingSubstrateSettings: {
    print_substrate_id: 0,
    machine_settings_id: 0,
    substrate_type: "--",
    supplier: "--",
    dyne_level: "--",
    width: 0,
    thickness: 0,
    density: 0,
    gsm: 0,
  },
  laminatingSubstrateSettings: {
    substrate_id: 0,
    lamination_id: 0,
    substrate_type: "--",
    supplier: "--",
    dyne_level: "--",
    width: 0,
    thickness: 0,
    density: 0,
    gsm: 0,
  },
  versionPopup: false,
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
      action: PayloadAction<LaminationSettings>
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
    setDyeCuttingSettings: (
      state,
      action: PayloadAction<DyeCuttingSettings>
    ) => {
      state.dyeCuttingSettings = action.payload;
    },
    setJobsListData: (state, action: PayloadAction<JobListData[]>) => {
      state.jobListData = action.payload;
    },
    setViewMasterDataDetails: (
      state,
      action: PayloadAction<ViewMasterDataDetails>
    ) => {
      state.viewMasterDataDetails = action.payload;
    },
    setVersionPopup: (state, action: PayloadAction<boolean>) => {
      state.versionPopup = action.payload;
    },
    setPrintingSubstrate: (
      state,
      action: PayloadAction<PrintingSubstrateSettings>
    ) => {
      state.printingSubstrateSettings = action.payload;
    },
    setLaminatingSubstrate: (
      state,
      action: PayloadAction<LaminatingSubstrateSettings>
    ) => {
      state.laminatingSubstrateSettings = action.payload;
    },
  },
});

export const {
  setSelectedTab,
  setRepeatTableData,
  setSubstrateTableData,
  setPrintingMachineSettingsData,
  setPrintingInkStationData,
  setDyeCuttingSettings,
  setLaminationAdhesiveDetails,
  setLaminationDetails,
  setLaminationSettings,
  setJobsListData,
  setViewMasterDataDetails,
  setVersionPopup,
  setPrintingSubstrate,
  setLaminatingSubstrate,
} = viewMasterDataSlice.actions;
export default viewMasterDataSlice.reducer;
