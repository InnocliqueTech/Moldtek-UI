import { createSlice, PayloadAction } from "@reduxjs/toolkit";



export interface PrintingTableRow {
  station_no: number;
  color_pantone: string;
  lf_value: string;
  ink_supplier: string;
  lpcm: string;
  volume: string;
  uv_led: string;
  uv_led_intensity: string;
}
export interface LaminatingTableRow {
  
  type: string;
  code: string;
  brand: string;
  ratio: string;
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
      printing_machine_name: string;
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
      lami_set_tension: string;
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
    zone1_temp: string;
    zone2_temp: string;
    nip_pressure_bar: string;
    speed: string;
    lami_set_tension: string;
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
    width: string;
    thickness: string;
    density: string;
  };

  bondingMaterials: LaminatingTableRow[];
}
export interface MasterFormData {
  unit_effectivity_number: string;
  customer_name: string;
  customer_logo: string;
  jar_cap: string;
  item_code: string;
  structure: string;
  brand_description: string;
  label_type: string;
  repeat_length: string;
  ups: string;
  tracks: string;
}

export interface DyeCuttingFormData {
  machine_type: string;
  machine_name: string;
  dye_code: string;
  run_speed: string;
}
export interface MasterDataFormErrors {
  repeat_length: string;
  ups: string;
  tracks: string;
  unit_effectivity_number: string;
  customer_name: string;
  customer_logo: string;
  jar_cap: string;
  item_code: string;
  structure: string;
  brand_description: string;
  label_type: string;
}
export interface DyeCuttingFormErrors {
  machine_type: string;
  machine_name: string;
  dye_code: string;
  run_speed: string;
}

export interface PrintingFormErrors {
  printing_machine_name: string;
  cylinder_teeth: string;
  tension: string;
  unwinder: string;
  infeed: string;
  outfeed: string;
  rewinder: string;
  static_charge: string;
  format_correct: string;
  substrate_type: string;
  supplier: string;
  dyne_level: string;
  width: string;
  thickness: string;
  density: string;
  [key: string]: string;
}
export interface LaminationFormErrors {
  zone1_temp: string;
    zone2_temp: string;
    nip_pressure_bar: string;
    speed: string;
    lami_set_tension:  string;
    rewinder_tension:  string;
    printed_film_tension:  string;
    laminate_film_tension: string;
    viscosity_range: string;
    adhesive_gsm: string;
    substrate_type: string;
    supplier: string;
    dyne_level:  string;
    width: string;
    thickness: string;
    density: string;
  [key: string]: string;
}

export interface PrintingFormValues {
  printingDetails: {
    printing_machine_name: string;
    cylinder_teeth: string;
    tension: string;
    unwinder: string;
    infeed: string;
    outfeed: string;
    rewinder: string;
    static_charge: string;
    format_correct: string;
  };
  printingSubstrateSettings: {
    print_substrate_id: string;
    machine_settings_id: string;
    substrate_type: string;
    supplier: string;
    dyne_level: string;
    width: string;
    thickness: string;
    density: string;
  };
  stationWiseMetrics: PrintingTableRow[];
}
interface Customer {
  customerId: number;
  firstName: string;
  lastName: string;
  fullName: string;
}
export interface LabelType {
  labelTypeId: number;
  labelTypeName: string;
}
export interface FiltersPayload{
  fromDate: string,
  toDate: string,
  customerName: string[],
  labelType: string[],
}
interface MasterDataState {
  customers: Customer[];
  labelTypes: LabelType[];
  selectedLabelTypeIds: LabelType[];
  selectedCustomers: Customer[];
  selectedCustomersData: {
    customers: Customer[];
  };
  dyeCuttingErrors: DyeCuttingFormErrors;
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
  selectedUEN: string;
  submitAndPublishButtonMasterData: boolean;
  masterDataDetailsSave:boolean;
  submitAndPublishButtonDyeCutting: boolean;
  submitAndPublishButtonPrinting: boolean;
  submitAndPublishButtonLamination: boolean;
  masterDataFormErrors: MasterDataFormErrors;
  invalidFieldsTable: { [key: string]: boolean };
  printingFormErrors:PrintingFormErrors;
  laminationFormErrors:LaminationFormErrors;
  laminationDataTouched:boolean;
printingDataTouched:boolean;
  dyeCuttingDataTouched:boolean;
  masterDataDataTouched:boolean;
  searchButton:boolean;
  filtersPayload:FiltersPayload;
  printingDataSave:boolean;
  laminationDataSave:boolean;
  isSearchTriggered:boolean;
  printingDetails:any;
  dyeCuttingDetails:any;
  laminatingDetails:any;
}

const initialState: MasterDataState = {
  isSearchTriggered:false,
  dyeCuttingDetails:"",
laminatingDetails:"",
  searchButton:false,
  masterDataDetailsSave:false,
  printingDataSave:false,
  laminationDataSave:false,
  printingDetails:"",
  laminationFormErrors:{
    zone1_temp: "",
    zone2_temp: "",
    nip_pressure_bar: "",
    speed: "",
    lami_set_tension:  "",
    rewinder_tension:  "",
    printed_film_tension:  "",
    laminate_film_tension: "",
    viscosity_range: "",
    adhesive_gsm: "",
    substrate_type: "",
    supplier: "",
    dyne_level:  "",
    width: "",
    thickness: "",
    density: "",
  },
  filtersPayload:{
    fromDate: "",
    toDate: "",
    customerName: [],
    labelType: [],
  },
  laminationDataTouched:false,
  printingDataTouched:false,
  dyeCuttingDataTouched:false,
  masterDataDataTouched:false,
  printingFormErrors:{
    printing_machine_name: "",
    cylinder_teeth: "",
    tension: "",
    unwinder: "",
    infeed: "",
    outfeed: "",
    rewinder: "",
    static_charge: "",
    format_correct: "",
    substrate_type: "",
    supplier: "",
    dyne_level: "",
    width: "",
    thickness: "",
    density: "",
  },
  masterDataFormErrors: {
    repeat_length: "",
    ups: "",
    tracks: "",
    unit_effectivity_number: "",
    customer_name: "",
    customer_logo: "",
    jar_cap: "",
    item_code: "",
    structure: "",
    brand_description: "",
    label_type: "",
  },
  invalidFieldsTable:{},
  dyeCuttingErrors: {
    machine_type: "",
    machine_name: "",
    dye_code: "",
    run_speed: "",
  },
  submitAndPublishButtonMasterData: false,
  submitAndPublishButtonDyeCutting: false,
  submitAndPublishButtonPrinting: false,
  submitAndPublishButtonLamination: false,
  customers: [],
  labelTypes: [],
  selectedLabelTypeIds: [],
  selectedTab: 0,
  openSider: false,
  updatePopup: false,
  submitPopup: false,
  submitPopupConfirm: false,
  submitAndPublish: false,
  selectedCustomers: [],
  selectedCustomersData: {
    customers: [],
  },
  selectedUEN: "",
  saveFormData: {
    unit_effectivity_number: "",
    customer_name: "",
    customer_logo: "",
    jar_cap: "",
    item_code: "",
    structure: "",
    brand_description: "",
    label_type: "",
    repeat_length: "",
    ups: "",
    tracks: "",
  },
  printingSaveFormData: {
    printingDetails: {
      printing_machine_name: "",
      cylinder_teeth: "",
      tension: "",
      unwinder: "",
      infeed: "",
      outfeed: "",
      rewinder: "",
      static_charge: "",
      format_correct: "",
    },
    printingSubstrateSettings: {
      print_substrate_id: "",
      machine_settings_id: "",
      substrate_type: "",
      supplier: "",
      dyne_level: "",
      width: "",
      thickness: "",
      density: "",
    },
    stationWiseMetrics: [
      {
        station_no: 1,
        color_pantone: "",
        lf_value: "",
        ink_supplier: "",
        lpcm: "",
        volume: "",
        uv_led: "",
        uv_led_intensity: "",
      },
      {
        station_no: 2,
        color_pantone: "",
        lf_value: "",
        ink_supplier: "",
        lpcm: "",
        volume: "",
        uv_led: "",
        uv_led_intensity: "",
      },
      {
        station_no: 3,
        color_pantone: "",
        lf_value: "",
        ink_supplier: "",
        lpcm: "",
        volume: "",
        uv_led: "",
        uv_led_intensity: "",
      },
      {
        station_no: 4,
        color_pantone: "",
        lf_value: "",
        ink_supplier: "",
        lpcm: "",
        volume: "",
        uv_led: "",
        uv_led_intensity: "",
      },
      {
        station_no: 5,
        color_pantone: "",
        lf_value: "",
        ink_supplier: "",
        lpcm: "",
        volume: "",
        uv_led: "",
        uv_led_intensity: "",
      },
      {
        station_no: 6,
        color_pantone: "",
        lf_value: "",
        ink_supplier: "",
        lpcm: "",
        volume: "",
        uv_led: "",
        uv_led_intensity: "",
      },
      {
        station_no: 7,
        color_pantone: "",
        lf_value: "",
        ink_supplier: "",
        lpcm: "",
        volume: "",
        uv_led: "",
        uv_led_intensity: "",
      },
      {
        station_no: 8,
        color_pantone: "",
        lf_value: "",
        ink_supplier: "",
        lpcm: "",
        volume: "",
        uv_led: "",
        uv_led_intensity: "",
      },
      {
        station_no: 9,
        color_pantone: "",
        lf_value: "",
        ink_supplier: "",
        lpcm: "",
        volume: "",
        uv_led: "",
        uv_led_intensity: "",
      },
      {
        station_no: 10,
        color_pantone: "",
        lf_value: "",
        ink_supplier: "",
        lpcm: "",
        volume: "",
        uv_led: "",
        uv_led_intensity: "",
      },
    ],
  },
  laminaionFormData: {
    laminationConditions: {
      zone1_temp: "",
      zone2_temp: "",
      nip_pressure_bar: "",
      speed: "",
      lami_set_tension: "",
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
      width: "",
      thickness: "",
      density: "",
    },
    bondingMaterials: [
      {
        type: "Adhesive",
        code: "",
        brand: "",
        ratio: "",
      },
      {
        type: "Hardener",
        code: "",
        brand: "",
        ratio: "",
      },
      {
        type: "Ethyl Acetate",
        code: "",
        brand: "",
        ratio: "",
      },
    ],
  },
  dyeCuttingFormData: {
    machine_type: "",
    machine_name: "",
    dye_code: "",
    run_speed: "",
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
        printing_machine_name: "",
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
        lami_set_tension: "",
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
    setSelectedUEN: (state, action: PayloadAction<string>) => {
      state.selectedUEN = action.payload;
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
    setLaminationDataTouched:(state,action:PayloadAction<boolean>)=>{
state.laminationDataTouched = action.payload
    },
    setPrintingDataTouched:(state,action:PayloadAction<boolean>)=>{
      state.printingDataTouched = action.payload
          },
          setDyeCuttingDataTouched:(state,action:PayloadAction<boolean>)=>{
            state.dyeCuttingDataTouched = action.payload
                },
                setMasterDataDataTouched:(state,action:PayloadAction<boolean>)=>{
                  state.masterDataDataTouched = action.payload
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
        run_speed: "",
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
    setMasterDataFormErros: (
      state,
      action: PayloadAction<MasterDataFormErrors>
    ) => {
      state.masterDataFormErrors = action.payload;
    },
    setDyeCuttingFormErros: (
      state,
      action: PayloadAction<DyeCuttingFormErrors>
    ) => {
      state.dyeCuttingErrors = action.payload;
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
        repeat_length: "",
        ups: "",
        tracks: "",
      };
    },
    setPrintngFormErros: (
      state,
      action: PayloadAction<PrintingFormErrors>
    ) => {
      state.printingFormErrors = action.payload;
    },
    clearPrintingFormErrors:(state)=>{
     state.printingFormErrors={
      printing_machine_name: "",
      cylinder_teeth: "",
      tension: "",
      unwinder: "",
      infeed: "",
      outfeed: "",
      rewinder: "",
      static_charge: "",
      format_correct: "",
      substrate_type: "",
      supplier: "",
      dyne_level: "",
      width: "",
      thickness: "",
      density: "",
     }
    },
    setLaminationFormErros: (
      state,
      action: PayloadAction<LaminationFormErrors>
    ) => {
      state.laminationFormErrors = action.payload;
    },
    clearLaminationFormErrors:(state)=>{
     state.laminationFormErrors={
        zone1_temp: "",
        zone2_temp: "",
        nip_pressure_bar: "",
        speed: "",
        lami_set_tension:  "",
        rewinder_tension:  "",
        printed_film_tension:  "",
        laminate_film_tension: "",
        viscosity_range: "",
        adhesive_gsm: "",
        substrate_type: "",
        supplier: "",
        dyne_level:  "",
        width: "",
        thickness: "",
        density: "",
      }
    },
    clearMasterDataFormErrors: (state) => {
      state.masterDataFormErrors = {
        repeat_length: "",
        ups: "",
        tracks: "",
        unit_effectivity_number: "",
        customer_name: "",
        customer_logo: "",
        jar_cap: "",
        item_code: "",
        structure: "",
        brand_description: "",
        label_type: "",
      };
    },
    clearDyeCuttingFormErrors: (state) => {
      state.dyeCuttingErrors = {
        machine_type: "",
        machine_name: "",
        dye_code: "",
        run_speed: "",
      };
    },
    clearPrintingFormData: (state) => {
      state.printingSaveFormData = {
        printingDetails: {
          printing_machine_name: "",
          cylinder_teeth: "",
          tension: "",
          unwinder: "",
          infeed: "",
          outfeed: "",
          rewinder: "",
          static_charge: "",
          format_correct: "",
        },
        printingSubstrateSettings: {
          print_substrate_id: "",
          machine_settings_id: "",

          substrate_type: "",
          supplier: "",
          dyne_level: "",
          width: "",
          thickness: "",
          density: "",
        },
        stationWiseMetrics: [
          {
            station_no: 1,
            color_pantone: "",
            lf_value: "",
            ink_supplier: "",
            lpcm: "",
            volume: "",
            uv_led: "",
            uv_led_intensity: "",
          },
          {
            station_no: 2,
            color_pantone: "",
            lf_value: "",
            ink_supplier: "",
            lpcm: "",
            volume: "",
            uv_led: "",
            uv_led_intensity: "",
          },
          {
            station_no: 3,
            color_pantone: "",
            lf_value: "",
            ink_supplier: "",
            lpcm: "",
            volume: "",
            uv_led: "",
            uv_led_intensity: "",
          },
          {
            station_no: 4,
            color_pantone: "",
            lf_value: "",
            ink_supplier: "",
            lpcm: "",
            volume: "",
            uv_led: "",
            uv_led_intensity: "",
          },
          {
            station_no: 5,
            color_pantone: "",
            lf_value: "",
            ink_supplier: "",
            lpcm: "",
            volume: "",
            uv_led: "",
            uv_led_intensity: "",
          },
          {
            station_no: 6,
            color_pantone: "",
            lf_value: "",
            ink_supplier: "",
            lpcm: "",
            volume: "",
            uv_led: "",
            uv_led_intensity: "",
          },
          {
            station_no: 7,
            color_pantone: "",
            lf_value: "",
            ink_supplier: "",
            lpcm: "",
            volume: "",
            uv_led: "",
            uv_led_intensity: "",
          },
          {
            station_no: 8,
            color_pantone: "",
            lf_value: "",
            ink_supplier: "",
            lpcm: "",
            volume: "",
            uv_led: "",
            uv_led_intensity: "",
          },
          {
            station_no: 9,
            color_pantone: "",
            lf_value: "",
            ink_supplier: "",
            lpcm: "",
            volume: "",
            uv_led: "",
            uv_led_intensity: "",
          },
          {
            station_no: 10,
            color_pantone: "",
            lf_value: "",
            ink_supplier: "",
            lpcm: "",
            volume: "",
            uv_led: "",
            uv_led_intensity: "",
          },
        ],
      };
    },
    clearLaminatingFormData: (state) => {
      state.laminaionFormData = {
        laminationConditions: {
          zone1_temp: "",
          zone2_temp: "",
          nip_pressure_bar: "",
          speed: "",
          lami_set_tension: "",
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
          width: "",
          thickness: "",
          density: "",
        },
        bondingMaterials: [
          {
            type: "Adhesive",
            code: "",
            brand: "",
            ratio: "",
          },
          {
            type: "Hardener",
            code: "",
            brand: "",
            ratio: "",
          },
          {
            type: "Ethyl Acetate",
            code: "",
            brand: "",
            ratio: "",
          },
        ],
      };
    },
    setRequestPayload: (state, action: PayloadAction<RequestPayload>) => {
      state.requestPayload = action.payload;
    },
    setSelectedCustomers: (state, action: PayloadAction<Customer[]>) => {
      state.selectedCustomers = action.payload;
    },
    toggleCustomerSelection: (state, action: PayloadAction<Customer>) => {
      const { customerId } = action.payload;
      const exists = state.selectedCustomers.some(
        (customer) => customer.customerId === customerId
      );
      if (exists) {
        state.selectedCustomers = state.selectedCustomers.filter(
          (customer) => customer.customerId !== customerId
        );
      } else {
        state.selectedCustomers.push(action.payload);
      }
    },

    setCustomers(state, action: PayloadAction<Customer[]>) {
      state.customers = action.payload;
    },
    setLabelTypes(state, action: PayloadAction<LabelType[]>) {
      state.labelTypes = action.payload;
    },
    setSelectedLabelTypeIds(state, action: PayloadAction<LabelType[]>) {
      state.selectedLabelTypeIds = action.payload;
    },
    toggleLabelType: (state, action: PayloadAction<LabelType>) => {
      const {labelTypeId} = action.payload;
      const exists = state.selectedLabelTypeIds.some((labelType)=> labelType.labelTypeId === labelTypeId);
      if (exists) {
        state.selectedLabelTypeIds = state.selectedLabelTypeIds.filter(
          (labelId) => labelId.labelTypeId !==labelTypeId
        );
      } else {
        state.selectedLabelTypeIds.push(action.payload);
      }
    },
    setSubmitAndPublishButtonMasterData: (state, action: PayloadAction<boolean>) => {
      state.submitAndPublishButtonMasterData = action.payload;
    },
    setMasterDataDetailsSave: (state, action: PayloadAction<boolean>) => {
      state.masterDataDetailsSave = action.payload;
    },
    setPrintingSave: (state, action: PayloadAction<boolean>) => {
      state.printingDataSave = action.payload;
    },
    setLaminationSave: (state, action: PayloadAction<boolean>) => {
      state.laminationDataSave = action.payload;
    },
    setSubmitAndPublishButtonDyeCutting: (state, action: PayloadAction<boolean>) => {
      state.submitAndPublishButtonDyeCutting = action.payload;
    },
    setSubmitAndPublishButtonPrinting: (state, action: PayloadAction<boolean>) => {
      state.submitAndPublishButtonPrinting = action.payload;
    },
    setSubmitAndPublishButtonMasterLamination: (state, action: PayloadAction<boolean>) => {
      state.submitAndPublishButtonLamination = action.payload;
    },
    setInvalidFieldsTable: (state, action: PayloadAction<{ [key: string]: boolean }>) => {
      state.invalidFieldsTable = action.payload;
    },
    clearInvalidFieldsTable:(state)=>{
      state.invalidFieldsTable= {}
    },
    setSearchButton:(state,action:PayloadAction<boolean>)=>{
      state.searchButton = action.payload
    },
    setFiltersPayload:(state,action:PayloadAction<FiltersPayload>)=>{
    state.filtersPayload = action.payload
    } ,
    setIsSearchTriggered:(state,action:PayloadAction<boolean>)=>{
      state.isSearchTriggered = action.payload
    },
    setPrintingDetails:(state,action:PayloadAction<any>)=>{
      state.printingDetails = action.payload
    } ,
    setDyeCuttingDetails:(state,action:PayloadAction<any>)=>{
      state.dyeCuttingDetails = action.payload
    } ,
    setLaminatingDetails:(state,action:PayloadAction<any>)=>{
      state.laminatingDetails = action.payload
    } 
  },
});

export const {
  setSelectedTab,
  setDyeCuttingDetails,
  setLaminatingDetails,
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
  setSelectedCustomers,
  toggleCustomerSelection,
  setSelectedLabelTypeIds,
  toggleLabelType,
  setLabelTypes,
  setCustomers,
  setSubmitAndPublishButtonMasterData,
  setMasterDataFormErros,
  clearMasterDataFormErrors,
  setDyeCuttingFormErros,
  clearDyeCuttingFormErrors,
  setInvalidFieldsTable,
  clearInvalidFieldsTable,
  setSubmitAndPublishButtonDyeCutting,
  setSubmitAndPublishButtonMasterLamination,
  setSubmitAndPublishButtonPrinting,
  setPrintngFormErros,
  clearPrintingFormErrors,
  setLaminationFormErros,
  clearLaminationFormErrors,
  setLaminationDataTouched,
  setDyeCuttingDataTouched,
  setMasterDataDataTouched,
  setPrintingDataTouched,
  setSearchButton,
  setPrintingDetails,

  setFiltersPayload,
  setMasterDataDetailsSave,
  setPrintingSave,
  setLaminationSave,
  setIsSearchTriggered
} = masterDataSlice.actions;
export default masterDataSlice.reducer;
