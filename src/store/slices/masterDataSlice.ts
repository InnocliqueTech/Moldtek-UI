import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface PrintingTableRow {
  station_no: number;
  color_pantone: string;
  lf_value: number;
  ink_supplier: string;
  lpcm: number;
  volume: string;
  uv_led: string;
  uv_led_intensity: string;
}
export interface LaminatingTableRow {
  type: string;
  code: string;
  brand: string;
  ratio: number;
}
export interface RequestPayload {
  masterDataDetails: {
    unit_effectivity_number: string;
    customer_name: string;
    customer_logo: string;
    item_code: string;
    brand_description: string;
    jar_cap: string;
    structure: string;
    label_type: string;
    repeat_length: number;
    ups: number;
    tracks: number;
  };
  masterDataPrinting: {
    printingDetails: {
      mounting_tape: string;
      cylinder_teeth: number;
      tension: number;
      unwinder: number;
      rewinder: number;
      infeed: number;
      outfeed: number;
      static_charge: number;
      format_correct: number;
    };
    printingSubstrateSettings: {
      substrate_type: string;
      supplier: string;
      dyne_level: string;
      width: number;
      thickness: number;
      density: number;
    };
    stationWiseMetrics: {
      station_no: number;
      color_pantone: string;
      lf_value: number;
      ink_supplier: string;
      lpcm: number;
      volume: string;
      uv_led: string;
      uv_led_intensity: string;
    }[];
  };
  masterDataLamination: {
    laminationConditions: {
      zone1_temp: number;
      zone2_temp: number;
      nip_pressure_bar: number;
      speed: number;
      last_set_tension: string;
      rewinder_tension: string;
      printed_film_tension: string;
      laminate_film_tension: string;
      viscosity_range: string;
      adhesive_gsm: string;
    };
    laminationSubstrate: {
      substrate_type: string;
      supplier: string;
      dyne_level: string;
      width: number;
      thickness: number;
      density: number;
    };
    bondingMaterials: {
      type: string;
      code: string;
      brand: string;
      ratio: number;
    }[];
  };
  masterDataDyeCutting: {
    machine_type: string;
    machine_name: string;
    dye_code: string;
    run_speed: number;

  };
}

export interface LaminationFormData {
  laminationConditions: {
    zone1_temp: number;
    zone2_temp: number;
    nip_pressure_bar: number;
    speed: number;
    last_set_tension: string;
    rewinder_tension: string;
    printed_film_tension: string;
    laminate_film_tension: string;
    viscosity_range: string;
    adhesive_gsm: string;
},

laminationSubstrate: {
  substrate_type: string;
  supplier: string;
  dyne_level: string;
  width: number;
  thickness: number;
  density: number;
},

bondingMaterials: LaminatingTableRow[];
}
export interface MasterFormData {
  unit_effectivity_number: string,
        customer_name: string,
        customer_logo: string,
        jar_cap: string,
        item_code: string,
        structure: string,
        brand_description: string,
        label_type: string,
        repeat_length: number,
        ups: number,
        tracks: number,
}

export interface DyeCuttingFormData {
  machine_type: string;
    machine_name: string;
    dye_code: string;
    run_speed: number;
}

export interface PrintingFormValues {
  printingDetails: {
    mounting_tape: string,
    cylinder_teeth: number,
    tension: number,
    unwinder: number,
    infeed: number,
    outfeed: number,
    rewinder: number,
    static_charge: number,
    format_correct: number,
    },
    printingSubstrateSettings: {
      print_substrate_id: number,
      machine_settings_id: number,
  substrate_type: string,
    supplier: string,
    dyne_level: string,
    width: number,
    thickness: number,
    density: number,
  },
  stationWiseMetrics:PrintingTableRow[];
}

interface MasterDataState {
  selectedTab: number;
  openSider: boolean;
  updatePopup: boolean;
  submitPopupConfirm: boolean;
  submitPopup: boolean;
  submitAndPublish: boolean;
  saveFormData: MasterFormData;
  printingSaveFormData: PrintingFormValues;
  laminaionFormData: LaminationFormData;
  dyeCuttingFormData: DyeCuttingFormData;
  isDyeCuttingDataSave: boolean;
  isMasterDetaisDataSave: boolean;
  isPrintingDataSave: boolean;
  isLaminationDataSave: boolean;
  requestPayload: RequestPayload;
  selectedUEN:string;
}

const initialState: MasterDataState = {
  selectedTab: 0,
  openSider: false,
  updatePopup: false,
  submitPopup: false,
  submitPopupConfirm: false,
  submitAndPublish: false,
  selectedUEN:'',
  saveFormData: {
    unit_effectivity_number: "",
    customer_name: "",
    customer_logo: "",
    jar_cap: "",
    item_code: "",
    structure: "",
    brand_description: "",
    label_type: "",
    repeat_length: 0,
    ups: 0,
    tracks: 0,
  },
  printingSaveFormData: {
    printingDetails: {
      mounting_tape: "",
      cylinder_teeth: 0,
      tension: 0,
      unwinder: 0,
      infeed: 0,
      outfeed: 0,
      rewinder: 0,
      static_charge: 0,
      format_correct: 0,
      },
      printingSubstrateSettings: {
  
        print_substrate_id: 0,
        machine_settings_id: 0,
    substrate_type: "",
      supplier: "",
      dyne_level: "",
      width: 0,
      thickness: 0,
      density: 0,
    },
    stationWiseMetrics:[
      {
        station_no: 1,
        color_pantone: "",
        lf_value: 0,
        ink_supplier: "",
        lpcm: 0,
        volume: "",
        uv_led: "",
        uv_led_intensity: "",
      },
      {
        station_no: 2,
        color_pantone: "",
        lf_value: 0,
        ink_supplier: "",
        lpcm: 0,
        volume: "",
        uv_led: "",
        uv_led_intensity: "",
      },
      {
        station_no: 3,
        color_pantone: "",
        lf_value: 0,
        ink_supplier: "",
        lpcm: 0,
        volume: "",
        uv_led: "",
        uv_led_intensity: "",
      },
      {
        station_no: 4,
        color_pantone: "",
        lf_value: 0,
        ink_supplier: "",
        lpcm: 0,
        volume: "",
        uv_led: "",
        uv_led_intensity: "",
      },
      {
        station_no: 5,
        color_pantone: "",
        lf_value: 0,
        ink_supplier: "",
        lpcm: 0,
        volume: "",
        uv_led: "",
        uv_led_intensity: "",
      },
      {
        station_no: 6,
        color_pantone: "",
        lf_value: 0,
        ink_supplier: "",
        lpcm: 0,
        volume: "",
        uv_led: "",
        uv_led_intensity: "",
      },
      {
        station_no: 7,
        color_pantone: "",
        lf_value: 0,
        ink_supplier: "",
        lpcm: 0,
        volume: "",
        uv_led: "",
        uv_led_intensity: "",
      },
      {
        station_no: 8,
        color_pantone: "",
        lf_value: 0,
        ink_supplier: "",
        lpcm: 0,
        volume: "",
        uv_led: "",
        uv_led_intensity: "",
      },
      {
        station_no: 9,
        color_pantone: "",
        lf_value: 0,
        ink_supplier: "",
        lpcm: 0,
        volume: "",
        uv_led: "",
        uv_led_intensity: "",
      },
      {
        station_no: 10,
        color_pantone: "",
        lf_value: 0,
        ink_supplier: "",
        lpcm: 0,
        volume: "",
        uv_led: "",
        uv_led_intensity: "",
      },    ],
  },
  laminaionFormData: {
    laminationConditions: {
      zone1_temp: 0,
      zone2_temp: 0,
      nip_pressure_bar: 0,
      speed: 0,
      last_set_tension: "",
      rewinder_tension: "",
      printed_film_tension: "",
      laminate_film_tension: "",
      viscosity_range: "",
      adhesive_gsm: ""
    },
    laminationSubstrate: {
      substrate_type: "",
      supplier: "",
      dyne_level: "",
      width: 0,
      thickness: 0,
      density: 0
    },
    bondingMaterials: [
      {
        type: "Adhesive",
        code: "",
        brand: "",
        ratio: 0
    
      },
      {
        type: "Hardener",
        code: "",
        brand: "",
        ratio: 0
    
      },
      {
        type: "Ethyl Acetate",
        code: "",
        brand: "",
        ratio: 0
    
      },
    ],
  },
  dyeCuttingFormData: {
    machine_type: "",
    machine_name: "",
    dye_code: "",
    run_speed: 0

  },
  isDyeCuttingDataSave: false,
  isMasterDetaisDataSave: false,
  isLaminationDataSave: false,
  isPrintingDataSave: false,
  requestPayload: {
    masterDataDetails: {
      unit_effectivity_number: "",
      customer_name: "",
      customer_logo: "",
      item_code: "",
      brand_description: "",
      jar_cap: "",
      structure: "",
      label_type: "",
      repeat_length: 0,
      ups: 0,
      tracks: 0,
    },
    masterDataPrinting: {
      printingDetails: {
        mounting_tape: "",
        cylinder_teeth: 0,
        tension: 0,
        unwinder: 0,
        rewinder: 0,
        infeed: 0,
        outfeed: 0,
        static_charge: 0,
        format_correct: 0,
      },
      printingSubstrateSettings: {
        substrate_type: "",
        supplier: "",
        dyne_level: "",
        width: 0,
        thickness: 0,
        density: 0,
      },
      stationWiseMetrics: [
        {
          station_no: 0,
          color_pantone: "",
          lf_value: 0,
          ink_supplier: "",
          lpcm: 0,
          volume: "",
          uv_led: "",
          uv_led_intensity: "",
        },
      ],
    },
    masterDataLamination: {
      laminationConditions: {
        zone1_temp: 0,
        zone2_temp: 0,
        nip_pressure_bar: 0,
        speed: 0,
        last_set_tension: "",
        rewinder_tension: "",
        printed_film_tension: "",
        laminate_film_tension: "",
        viscosity_range: "",
        adhesive_gsm: "",
      },
      laminationSubstrate: {
        substrate_type: "",
        supplier: "",
        dyne_level: "",
        width: 0,
        thickness: 0,
        density: 0,
      },
      bondingMaterials: [
        {
          type: "",
          code: "",
          brand: "",
          ratio: 0,
        },
      ],
    },
    masterDataDyeCutting: {
      machine_type: "",
      machine_name: "",
      dye_code: "",
      run_speed: 0,
    },
  },
};

const masterDataSlice = createSlice({
  name: "masterData",
  initialState,
  reducers: {
    setSelectedTab: (state, action: PayloadAction<number>) => {
      state.selectedTab = action.payload;
    },
    setOpenSlider: (state, action: PayloadAction<boolean>) => {
      state.openSider = action.payload;
    },
    setUploadPopup: (state, action: PayloadAction<boolean>) => {
      state.updatePopup = action.payload;
    },
    setSubmitPopupConfirm: (state, action: PayloadAction<boolean>) => {
      state.submitPopupConfirm = action.payload;
    },
    setSubmitPopup: (state, action: PayloadAction<boolean>) => {
      state.submitPopup = action.payload;
    },
    setSubmitAndPublishPopup: (state, action: PayloadAction<boolean>) => {
      state.submitAndPublish = action.payload;
    },
    setSaveFormData: (state, action: PayloadAction<MasterFormData>) => {
      state.saveFormData = { ...state.saveFormData, ...action.payload };
    },
    setSelectedUEN:(state,action:PayloadAction<string>)=>{
     state.selectedUEN = action.payload
    },
    setSavePrintingFormData: (
      state,
      action: PayloadAction<PrintingFormValues>
    ) => {
      state.printingSaveFormData = {
        ...state.printingSaveFormData,
        ...action.payload,
      };
    },
    setLaminationFormData: (
      state,
      action: PayloadAction<LaminationFormData>
    ) => {
      state.laminaionFormData = {
        ...state.laminaionFormData,
        ...action.payload,
      };
    },
    setDyeCuttingFormData: (
      state,
      action: PayloadAction<DyeCuttingFormData>
    ) => {
      state.dyeCuttingFormData = {
        ...state.dyeCuttingFormData,
        ...action.payload,
      };
    },
    clearDyeCuttingFormData: (state) => {
      state.dyeCuttingFormData = {
        machine_type: "",
    machine_name: "",
    dye_code: "",
    run_speed: 0
      };
    },
    setIsDyeCuttingSave: (state, action: PayloadAction<boolean>) => {
      state.isDyeCuttingDataSave = action.payload;
    },
    setIsMasterDetailsDataSave: (state, action: PayloadAction<boolean>) => {
      state.isMasterDetaisDataSave = action.payload;
    },
    setIsLaminatingDataSave: (state, action: PayloadAction<boolean>) => {
      state.isLaminationDataSave = action.payload;
    },
    setIsPrintingDataSave: (state, action: PayloadAction<boolean>) => {
      state.isPrintingDataSave = action.payload;
    },
    clearMasterDetaisData: (state) => {
      state.saveFormData = {
        unit_effectivity_number: "",
        customer_name: "",
        customer_logo: "",
        jar_cap: "",
        item_code: "",
        structure: "",
        brand_description: "",
        label_type: "",
        repeat_length: 0,
        ups: 0,
        tracks: 0,
      };
    },
    clearPrintingFormData: (state) => {
      state.printingSaveFormData = {
        printingDetails: {
          mounting_tape: "",
          cylinder_teeth: 0,
          tension: 0,
          unwinder: 0,
          infeed: 0,
          outfeed: 0,
          rewinder: 0,
          static_charge: 0,
          format_correct: 0,
          },
          printingSubstrateSettings: {
            print_substrate_id: 0,
            machine_settings_id: 0,
      
        substrate_type: "",
          supplier: "",
          dyne_level: "",
          width: 0,
          thickness: 0,
          density: 0,
        },
        stationWiseMetrics:[
          {
            station_no: 1,
            color_pantone: "",
            lf_value: 0,
            ink_supplier: "",
            lpcm: 0,
            volume: "",
            uv_led: "",
            uv_led_intensity: "",
          },
          {
            station_no: 2,
            color_pantone: "",
            lf_value: 0,
            ink_supplier: "",
            lpcm: 0,
            volume: "",
            uv_led: "",
            uv_led_intensity: "",
          },
          {
            station_no: 3,
            color_pantone: "",
            lf_value: 0,
            ink_supplier: "",
            lpcm: 0,
            volume: "",
            uv_led: "",
            uv_led_intensity: "",
          },
          {
            station_no: 4,
            color_pantone: "",
            lf_value: 0,
            ink_supplier: "",
            lpcm: 0,
            volume: "",
            uv_led: "",
            uv_led_intensity: "",
          },
          {
            station_no: 5,
            color_pantone: "",
            lf_value: 0,
            ink_supplier: "",
            lpcm: 0,
            volume: "",
            uv_led: "",
            uv_led_intensity: "",
          },
          {
            station_no: 6,
            color_pantone: "",
            lf_value: 0,
            ink_supplier: "",
            lpcm: 0,
            volume: "",
            uv_led: "",
            uv_led_intensity: "",
          },
          {
            station_no: 7,
            color_pantone: "",
            lf_value: 0,
            ink_supplier: "",
            lpcm: 0,
            volume: "",
            uv_led: "",
            uv_led_intensity: "",
          },
          {
            station_no: 8,
            color_pantone: "",
            lf_value: 0,
            ink_supplier: "",
            lpcm: 0,
            volume: "",
            uv_led: "",
            uv_led_intensity: "",
          },
          {
            station_no: 9,
            color_pantone: "",
            lf_value: 0,
            ink_supplier: "",
            lpcm: 0,
            volume: "",
            uv_led: "",
            uv_led_intensity: "",
          },
          {
            station_no: 10,
            color_pantone: "",
            lf_value: 0,
            ink_supplier: "",
            lpcm: 0,
            volume: "",
            uv_led: "",
            uv_led_intensity: "",
          },    ],
      }
    },
    clearLaminatingFormData: (state) => {
      state.laminaionFormData = {
        laminationConditions: {
          zone1_temp: 0,
          zone2_temp: 0,
          nip_pressure_bar: 0,
          speed: 0,
          last_set_tension: "",
          rewinder_tension: "",
          printed_film_tension: "",
          laminate_film_tension: "",
          viscosity_range: "",
          adhesive_gsm: ""
        },
        laminationSubstrate: {
          substrate_type: "",
          supplier: "",
          dyne_level: "",
          width: 0,
          thickness: 0,
          density: 0
        },
        bondingMaterials: [
          {
            type: "Adhesive",
            code: "",
            brand: "",
            ratio: 0
        
          },
          {
            type: "Hardener",
            code: "",
            brand: "",
            ratio: 0
        
          },
          {
            type: "Ethyl Acetate",
            code: "",
            brand: "",
            ratio: 0
        
          },
        ],
      };
    },
    setRequestPayload: (state, action: PayloadAction<RequestPayload>) => {
      state.requestPayload = action.payload;
    },
  },
});

export const {
  setSelectedTab,
  setOpenSlider,
  setUploadPopup,
  setSubmitPopupConfirm,
  setSubmitPopup,
  setSubmitAndPublishPopup,
  setSaveFormData,
  setSavePrintingFormData,
  setLaminationFormData,
  setDyeCuttingFormData,
  clearDyeCuttingFormData,
  setIsDyeCuttingSave,
  setIsMasterDetailsDataSave,
  setIsLaminatingDataSave,
  setIsPrintingDataSave,
  clearLaminatingFormData,
  clearMasterDetaisData,
  clearPrintingFormData,
  setRequestPayload,
  setSelectedUEN,
} = masterDataSlice.actions;
export default masterDataSlice.reducer;
