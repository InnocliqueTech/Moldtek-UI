import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Customer, DyeCuttingFormData, DyeCuttingFormErrors, FiltersPayload, LabelType, LaminationFormData, LaminationFormErrors, MasterDataFormErrors, MasterDataState, MasterFormData, PrintingFormErrors, PrintingFormValues, RequestPayload } from "./masterDataInterface";



const initialState: MasterDataState = {
  updateButton:false,
  customerLogoFile:null,
  dropDownValuesStructure:[],
  dropDownValuesMountingTape:[],
  dropDownValuesSupplierLamination:[],
  dropDownValuesSupplierPrinting:[],
  dropDownValuesPrinting:[],
  dropDownValuesLamination:[],
  saveLaminatingData: {
    laminationConditions: {
      lamination_id: 0,
      job_master_id: 0,
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
      substrate_id: 0,
      lamination_id: 0,
      substrate_type: "",
      supplier: "",
      dyne_level: "",
      width: "",
      thickness: "",
      density: "",
    },
    bondingMaterials: [
      {
        bonding_id: 0,
        lamination_id: 0,
        type: "Adhesive",
        code: "",
        brand: "",
        ratio: "",
      },
      {
        bonding_id: 0,
        lamination_id: 0,
        type: "Hardner",
        code: "",
        brand: "",
        ratio: "",
      },
      {
        bonding_id: 0,
        lamination_id: 0,
        type: "Ethyl",
        code: "",
        brand: "",
        ratio: "",
      },
    ],
  },
  savePrintingData: {
    printingDetails: {
      machine_settings_id: 0,
      job_master_id: 0,
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
      print_substrate_id: 0,
      machine_settings_id: 0,
      substrate_type: "",
      supplier: "",
      dyne_level: "",
      width: "",
      thickness: "",
      density: "",
    },
    stationWiseMetrics: [
      {
        station_id: 0,
        station_no: 1,
        color_pantone: "",
        lf_value: "",
        ink_supplier: "",
        lpcm: "",
        volume: "",
        uv_led: "",
        uv_led_intensity: "",
        mounting_tape: "",
        mptl_code: "",
        mixing_on_gec: "",
      },
      {
        station_id: 0,
        station_no: 2,
        color_pantone: "",
        lf_value: "",
        ink_supplier: "",
        lpcm: "",
        volume: "",
        uv_led: "",
        uv_led_intensity: "",
        mounting_tape: "",
        mptl_code: "",
        mixing_on_gec: "",
      },
      {
        station_id: 0,
        station_no: 3,
        color_pantone: "",
        lf_value: "",
        ink_supplier: "",
        lpcm: "",
        volume: "",
        uv_led: "",
        uv_led_intensity: "",
        mounting_tape: "",
        mptl_code: "",
        mixing_on_gec: "",
      },
      {
        station_id: 0,
        station_no: 4,
        color_pantone: "",
        lf_value: "",
        ink_supplier: "",
        lpcm: "",
        volume: "",
        uv_led: "",
        uv_led_intensity: "",
        mounting_tape: "",
        mptl_code: "",
        mixing_on_gec: "",
      },
      {
        station_id: 0,
        station_no: 5,
        color_pantone: "",
        lf_value: "",
        ink_supplier: "",
        lpcm: "",
        volume: "",
        uv_led: "",
        uv_led_intensity: "",
        mounting_tape: "",
        mptl_code: "",
        mixing_on_gec: "",
      },
      {
        station_id: 0,
        station_no: 6,
        color_pantone: "",
        lf_value: "",
        ink_supplier: "",
        lpcm: "",
        volume: "",
        uv_led: "",
        uv_led_intensity: "",
        mounting_tape: "",
        mptl_code: "",
        mixing_on_gec: "",
      },
      {
        station_id: 0,
        station_no: 7,
        color_pantone: "",
        lf_value: "",
        ink_supplier: "",
        lpcm: "",
        volume: "",
        uv_led: "",
        uv_led_intensity: "",
        mounting_tape: "",
        mptl_code: "",
        mixing_on_gec: "",
      },
      {
        station_id: 0,
        station_no: 8,
        color_pantone: "",
        lf_value: "",
        ink_supplier: "",
        lpcm: "",
        volume: "",
        uv_led: "",
        uv_led_intensity: "",
        mounting_tape: "",
        mptl_code: "",
        mixing_on_gec: "",
      },
      {
        station_id: 0,
        station_no: 9,
        color_pantone: "",
        lf_value: "",
        ink_supplier: "",
        lpcm: "",
        volume: "",
        uv_led: "",
        uv_led_intensity: "",
        mounting_tape: "",
        mptl_code: "",
        mixing_on_gec: "",
      },
      {
        station_id: 0,
        station_no: 10,
        color_pantone: "",
        lf_value: "",
        ink_supplier: "",
        lpcm: "",
        volume: "",
        uv_led: "",
        uv_led_intensity: "",
        mounting_tape: "",
        mptl_code: "",
        mixing_on_gec: "",
      },
    ],
  },
  saveButtonMasterData: false,
  saveButtonPrintingData: false,
  saveButtonLaminatingData: false,
  submitTrue: false,
  rememberMe: false,
  isSearchTriggered: false,
  dyeCuttingDetails: "",
  laminatingDetails: "",
  searchButton: false,
  printingTab: false,
  laminationTab: false,
  masterDataDetailsSave: false,
  printingDataSave: false,
  laminationDataSave: false,
  printingDetails: "",
  printingTableValueVaidation: false,
  laminationTableValueVaidation: false,
  laminationFormErrors: {
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
    substrate_type: "",
    supplier: "",
    dyne_level: "",
    width: "",
    thickness: "",
    density: "",
  },
  filtersPayload: {
    fromDate: "",
    toDate: "",
    customerName: [],
    labelType: [],
    searchField :''
  },
  laminationDataTouched: false,
  printingDataTouched: false,
  dyeCuttingDataTouched: false,
  masterDataDataTouched: false,
  printingFormErrors: {
    cylinder_teeth: "",
    tension: "",
    static_charge: "",
    format_correct: "",
    dyne_level: "",
    width: "",
    thickness: "",
    density: "",
    color_pantone: "",
    lf_value: "",
    ink_supplier: "",
    lpcm: "",
    volume: "",
    uv_led: "",
    uv_led_intensity: "",
    mixing_on_gec: "",
    mptl_code: "",
    mounting_tape: "",
  },
  masterDataFormErrors: {
    job_master_id: "",
    repeat_length: "",
    ups: "",
    tracks: "",
    unit_effectivity_number: "",
    customer_name: "",
    customer_logo: "",
    jar_cap: "",
    segment:"",
    item_code: "",
    structure: "",
    brand_description: "",
    label_type: "",
  },
  invalidFieldsTable: {},
  dyeCuttingErrors: {
    job_master_id: "",
    dye_cutting_id: "",
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
    job_master_id: 0,
    unit_effectivity_number: "",
    customer_name: "",
    customer_logo: "",
    jar_cap: "",
    segment:"",
    item_code: "",
    structure: "",
    brand_description: "",
    label_type: "",
    repeat_length: "",
    ups: "",
    tracks: "",
  },
  saveMasterDataDetailsData: {
    job_master_id: 0,
    unit_effectivity_number: "",
    customer_name: "",
    customer_logo: "",
    jar_cap: "",
    segment:"",
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
      machine_settings_id: 0,
      job_master_id: 0,
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
      print_substrate_id: 0,
      machine_settings_id: 0,
      substrate_type: "",
      supplier: "",
      dyne_level: "",
      width: "",
      thickness: "",
      density: "",
    },
    stationWiseMetrics: [
      {
        station_id: 0,
        station_no: 1,
        color_pantone: "",
        lf_value: "",
        ink_supplier: "",
        lpcm: "",
        volume: "",
        uv_led: "",
        uv_led_intensity: "",
        mounting_tape: "",
        mptl_code: "",
        mixing_on_gec: "",
      },
      {
        station_id: 0,
        station_no: 2,
        color_pantone: "",
        lf_value: "",
        ink_supplier: "",
        lpcm: "",
        volume: "",
        uv_led: "",
        uv_led_intensity: "",
        mounting_tape: "",
        mptl_code: "",
        mixing_on_gec: "",
      },
      {
        station_id: 0,
        station_no: 3,
        color_pantone: "",
        lf_value: "",
        ink_supplier: "",
        lpcm: "",
        volume: "",
        uv_led: "",
        uv_led_intensity: "",
        mounting_tape: "",
        mptl_code: "",
        mixing_on_gec: "",
      },
      {
        station_id: 0,
        station_no: 4,
        color_pantone: "",
        lf_value: "",
        ink_supplier: "",
        lpcm: "",
        volume: "",
        uv_led: "",
        uv_led_intensity: "",
        mounting_tape: "",
        mptl_code: "",
        mixing_on_gec: "",
      },
      {
        station_id: 0,
        station_no: 5,
        color_pantone: "",
        lf_value: "",
        ink_supplier: "",
        lpcm: "",
        volume: "",
        uv_led: "",
        uv_led_intensity: "",
        mounting_tape: "",
        mptl_code: "",
        mixing_on_gec: "",
      },
      {
        station_id: 0,
        station_no: 6,
        color_pantone: "",
        lf_value: "",
        ink_supplier: "",
        lpcm: "",
        volume: "",
        uv_led: "",
        uv_led_intensity: "",
        mounting_tape: "",
        mptl_code: "",
        mixing_on_gec: "",
      },
      {
        station_id: 0,
        station_no: 7,
        color_pantone: "",
        lf_value: "",
        ink_supplier: "",
        lpcm: "",
        volume: "",
        uv_led: "",
        uv_led_intensity: "",
        mounting_tape: "",
        mptl_code: "",
        mixing_on_gec: "",
      },
      {
        station_id: 0,
        station_no: 8,
        color_pantone: "",
        lf_value: "",
        ink_supplier: "",
        lpcm: "",
        volume: "",
        uv_led: "",
        uv_led_intensity: "",
        mounting_tape: "",
        mptl_code: "",
        mixing_on_gec: "",
      },
      {
        station_id: 0,
        station_no: 9,
        color_pantone: "",
        lf_value: "",
        ink_supplier: "",
        lpcm: "",
        volume: "",
        uv_led: "",
        uv_led_intensity: "",
        mounting_tape: "",
        mptl_code: "",
        mixing_on_gec: "",
      },
      {
        station_id: 0,
        station_no: 10,
        color_pantone: "",
        lf_value: "",
        ink_supplier: "",
        lpcm: "",
        volume: "",
        uv_led: "",
        uv_led_intensity: "",
        mounting_tape: "",
        mptl_code: "",
        mixing_on_gec: "",
      },
    ],
  },
  laminaionFormData: {
    laminationConditions: {
      lamination_id: 0,
      job_master_id: 0,
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
      substrate_id: 0,
      lamination_id: 0,
      substrate_type: "",
      supplier: "",
      dyne_level: "",
      width: "",
      thickness: "",
      density: "",
    },
    bondingMaterials: [
      {
        bonding_id: 0,
        lamination_id: 0,
        type: "Adhesive",
        code: "",
        brand: "",
        ratio: "",
      },
      {
        bonding_id: 0,
        lamination_id: 0,
        type: "Hardner",
        code: "",
        brand: "",
        ratio: "",
      },
      {
        bonding_id: 0,
        lamination_id: 0,
        type: "Ethyl",
        code: "",
        brand: "",
        ratio: "",
      },
    ],
  },
  dyeCuttingFormData: {
    dye_cutting_id: 0,
    job_master_id: 0,
    machine_type: "",
    machine_name: "",
    dye_code: "",
    run_speed: "",
  },
  isDyeCuttingDataSave: false,
  isMasterDetaisDataSave: false,
  isLaminationDataSave: false,
  isPrintingDataSave: false,
  isMasterDetaisData: false,
  isLaminationData: false,
  isPrintingData: false,
  requestPayload: {
    masterDataDetails: {
      job_master_id: 0,
      unit_effectivity_number: "",
      customer_name: "",
      customer_logo: "",
      item_code: "",
      brand_description: "",
      jar_cap: "",
      segment:"",
      structure: "",
      label_type: "",
      repeat_length: 0,
      ups: 0,
      tracks: 0,
    },
    masterDataPrinting: {
      printingDetails: {
        machine_settings_id: 0,
        job_master_id: 0,
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
        print_substrate_id: 0,
        machine_settings_id: 0,
        substrate_type: "",
        supplier: "",
        dyne_level: "",
        width: 0,
        thickness: 0,
        density: 0,
      },
      stationWiseMetrics: [
        {
          station_id: 0,
          station_no: 0,
          color_pantone: "",
          lf_value: 0,
          ink_supplier: "",
          lpcm: 0,
          volume: "",
          uv_led: "",
          uv_led_intensity: "",
          mounting_tape: "",
          mptl_code: 0,
          mixing_on_gec: 0,
        },
      ],
    },
    masterDataLamination: {
      laminationConditions: {
        lamination_id: 0,
        job_master_id: 0,
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
        substrate_id: 0,
        lamination_id: 0,
        substrate_type: "",
        supplier: "",
        dyne_level: "",
        width: 0,
        thickness: 0,
        density: 0,
      },
      bondingMaterials: [
        {
          bonding_id: 0,
          lamination_id: 0,
          type: "",
          code: "",
          brand: "",
          ratio: 0,
        },
      ],
    },
    masterDataDyeCutting: {
      dye_cutting_id: 0,
      job_master_id: 0,
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
    setCustomerLogoFile:(state,action:PayloadAction<any>)=>{
state.customerLogoFile = action.payload
    },
    setUpdateButton:(state,action:PayloadAction<boolean>)=>{
state.updateButton = action.payload
    },
    setPrintingDropDownValues:(state,action:PayloadAction<any>)=>{
     state.dropDownValuesPrinting = action.payload
    },
    setStructureDropDownValues:(state,action:PayloadAction<any>)=>{
      state.dropDownValuesStructure = action.payload
     },
     setMountinTapeDropDownValues:(state,action:PayloadAction<any>)=>{
      state.dropDownValuesMountingTape = action.payload
     },
     setSupplierPrintingDropDownValues:(state,action:PayloadAction<any>)=>{
      state.dropDownValuesSupplierPrinting = action.payload
     },
     setSupplieraminationDropDownValues:(state,action:PayloadAction<any>)=>{
      state.dropDownValuesSupplierLamination = action.payload
     },
    setlaminationDropDownValues:(state,action:PayloadAction<any>)=>{
      state.dropDownValuesLamination = action.payload
     },
    setSelectedTab: (state, action: PayloadAction<number>) => {
      state.selectedTab = action.payload;
    },
    setOpenSlider: (state, action: PayloadAction<boolean>) => {
      state.openSider = action.payload;
    },
    setUploadPopup: (state, action: PayloadAction<boolean>) => {
      state.updatePopup = action.payload;
    },
    setPrintingTab: (state, action: PayloadAction<boolean>) => {
      state.printingTab = action.payload;
    },
    setLaminationTab: (state, action: PayloadAction<boolean>) => {
      state.laminationTab = action.payload;
    },
    setSubmitPopupConfirm: (state, action: PayloadAction<boolean>) => {
      state.submitPopupConfirm = action.payload;
    },
    setSubmitPopup: (state, action: PayloadAction<boolean>) => {
      state.submitPopup = action.payload;
    },
    setSubmitTrue: (state, action: PayloadAction<boolean>) => {
      state.submitTrue = action.payload;
    },
    setSubmitAndPublishPopup: (state, action: PayloadAction<boolean>) => {
      state.submitAndPublish = action.payload;
    },
    setSaveFormData: (state, action: PayloadAction<MasterFormData>) => {
      state.saveFormData = { ...state.saveFormData, ...action.payload };
    },
    setSaveButtonMasterData: (state, action: PayloadAction<boolean>) => {
      state.saveButtonMasterData = action.payload;
    },
    setSaveMasterDataDetailsData: (
      state,
      action: PayloadAction<MasterFormData>
    ) => {
      state.saveMasterDataDetailsData = {
        ...state.saveMasterDataDetailsData,
        ...action.payload,
      };
    },
    setSaveButtonPrintingData: (state, action: PayloadAction<boolean>) => {
      state.saveButtonPrintingData = action.payload;
    },
    setSavePrintingData: (
      state,
      action: PayloadAction<PrintingFormValues>
    ) => {
      state.savePrintingData = {
        ...state.savePrintingData,
        ...action.payload,
      };
    },
    setSaveButtonLaminatingData: (state, action: PayloadAction<boolean>) => {
      state.saveButtonLaminatingData = action.payload;
    },
    setSaveLaminatingData: (
      state,
      action: PayloadAction<LaminationFormData>
    ) => {
      state.saveLaminatingData = {
        ...state.saveLaminatingData,
        ...action.payload,
      };
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
    setLaminationDataTouched: (state, action: PayloadAction<boolean>) => {
      state.laminationDataTouched = action.payload;
    },
    setPrintingDataTouched: (state, action: PayloadAction<boolean>) => {
      state.printingDataTouched = action.payload;
    },
    setDyeCuttingDataTouched: (state, action: PayloadAction<boolean>) => {
      state.dyeCuttingDataTouched = action.payload;
    },
    setMasterDataDataTouched: (state, action: PayloadAction<boolean>) => {
      state.masterDataDataTouched = action.payload;
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
        dye_cutting_id: 0,
        job_master_id: 0,
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
    setIsMasterDetailsData: (state, action: PayloadAction<boolean>) => {
      state.isMasterDetaisData = action.payload;
    },
    setIsLaminatingData: (state, action: PayloadAction<boolean>) => {
      state.isLaminationData = action.payload;
    },
    setIsPrintingData: (state, action: PayloadAction<boolean>) => {
      state.isPrintingData = action.payload;
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
    setRememberMe: (state, action: PayloadAction<boolean>) => {
      state.rememberMe = action.payload;
    },
    setLaminationTableValueVaidation: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.laminationTableValueVaidation = action.payload;
    },
    setPrintingTableValueVaidation: (state, action: PayloadAction<boolean>) => {
      state.printingTableValueVaidation = action.payload;
    },
    clearMasterDetaisData: (state) => {
      state.saveFormData = {
        job_master_id: 0,
        unit_effectivity_number: "",
        customer_name: "",
        customer_logo: "",
        jar_cap: "",
        segment:"",
        item_code: "",
        structure: "",
        brand_description: "",
        label_type: "",
        repeat_length: "",
        ups: "",
        tracks: "",
      };
    },
    clearSaveMasterDetailsData: (state) => {
      state.saveMasterDataDetailsData = {
        job_master_id: 0,
        unit_effectivity_number: "",
        customer_name: "",
        customer_logo: "",
        jar_cap: "",
        segment:"",
        item_code: "",
        structure: "",
        brand_description: "",
        label_type: "",
        repeat_length: "",
        ups: "",
        tracks: "",
      };
    },
    setPrintngFormErros: (state, action: PayloadAction<PrintingFormErrors>) => {
      state.printingFormErrors = action.payload;
    },
    clearPrintingFormErrors: (state) => {
      state.printingFormErrors = {
        cylinder_teeth: "",
        tension: "",
        static_charge: "",
        format_correct: "",
        dyne_level: "",
        width: "",
        thickness: "",
        density: "",
        color_pantone: "",
        lf_value: "",
        ink_supplier: "",
        lpcm: "",
        volume: "",
        uv_led: "",
        uv_led_intensity: "",
        mixing_on_gec: "",
        mptl_code: "",
        mounting_tape: "",
      };
    },
    setLaminationFormErros: (
      state,
      action: PayloadAction<LaminationFormErrors>
    ) => {
      state.laminationFormErrors = action.payload;
    },
    clearLaminationFormErrors: (state) => {
      state.laminationFormErrors = {
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
        substrate_type: "",
        supplier: "",
        dyne_level: "",
        width: "",
        thickness: "",
        density: "",
      };
    },
    clearMasterDataFormErrors: (state) => {
      state.masterDataFormErrors = {
        job_master_id: "",
        repeat_length: "",
        ups: "",
        tracks: "",
        unit_effectivity_number: "",
        customer_name: "",
        customer_logo: "",
        jar_cap: "",
        segment:"",
        item_code: "",
        structure: "",
        brand_description: "",
        label_type: "",
      };
    },
    clearDyeCuttingFormErrors: (state) => {
      state.dyeCuttingErrors = {
        job_master_id: "",
        dye_cutting_id: "",
        machine_type: "",
        machine_name: "",
        dye_code: "",
        run_speed: "",
      };
    },
    clearPrintingFormData: (state) => {
      state.printingSaveFormData = {
        printingDetails: {
          machine_settings_id: 0,
          job_master_id: 0,
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
          print_substrate_id: 0,
          machine_settings_id: 0,

          substrate_type: "",
          supplier: "",
          dyne_level: "",
          width: "",
          thickness: "",
          density: "",
        },
        stationWiseMetrics: [
          {
            station_id: 0,
            station_no: 1,
            color_pantone: "",
            lf_value: "",
            ink_supplier: "",
            lpcm: "",
            volume: "",
            uv_led: "",
            uv_led_intensity: "",
            mounting_tape: "",
            mptl_code: "",
            mixing_on_gec: "",
          },
          {
            station_id: 0,
            station_no: 2,
            color_pantone: "",
            lf_value: "",
            ink_supplier: "",
            lpcm: "",
            volume: "",
            uv_led: "",
            uv_led_intensity: "",
            mounting_tape: "",
            mptl_code: "",
            mixing_on_gec: "",
          },
          {
            station_id: 0,
            station_no: 3,
            color_pantone: "",
            lf_value: "",
            ink_supplier: "",
            lpcm: "",
            volume: "",
            uv_led: "",
            uv_led_intensity: "",
            mounting_tape: "",
            mptl_code: "",
            mixing_on_gec: "",
          },
          {
            station_id: 0,
            station_no: 4,
            color_pantone: "",
            lf_value: "",
            ink_supplier: "",
            lpcm: "",
            volume: "",
            uv_led: "",
            uv_led_intensity: "",
            mounting_tape: "",
            mptl_code: "",
            mixing_on_gec: "",
          },
          {
            station_id: 0,
            station_no: 5,
            color_pantone: "",
            lf_value: "",
            ink_supplier: "",
            lpcm: "",
            volume: "",
            uv_led: "",
            uv_led_intensity: "",
            mounting_tape: "",
            mptl_code: "",
            mixing_on_gec: "",
          },
          {
            station_id: 0,
            station_no: 6,
            color_pantone: "",
            lf_value: "",
            ink_supplier: "",
            lpcm: "",
            volume: "",
            uv_led: "",
            uv_led_intensity: "",
            mounting_tape: "",
            mptl_code: "",
            mixing_on_gec: "",
          },
          {
            station_id: 0,
            station_no: 7,
            color_pantone: "",
            lf_value: "",
            ink_supplier: "",
            lpcm: "",
            volume: "",
            uv_led: "",
            uv_led_intensity: "",
            mounting_tape: "",
            mptl_code: "",
            mixing_on_gec: "",
          },
          {
            station_id: 0,
            station_no: 8,
            color_pantone: "",
            lf_value: "",
            ink_supplier: "",
            lpcm: "",
            volume: "",
            uv_led: "",
            uv_led_intensity: "",
            mounting_tape: "",
            mptl_code: "",
            mixing_on_gec: "",
          },
          {
            station_id: 0,
            station_no: 9,
            color_pantone: "",
            lf_value: "",
            ink_supplier: "",
            lpcm: "",
            volume: "",
            uv_led: "",
            uv_led_intensity: "",
            mounting_tape: "",
            mptl_code: "",
            mixing_on_gec: "",
          },
          {
            station_id: 0,
            station_no: 10,
            color_pantone: "",
            lf_value: "",
            ink_supplier: "",
            lpcm: "",
            volume: "",
            uv_led: "",
            uv_led_intensity: "",
            mounting_tape: "",
            mptl_code: "",
            mixing_on_gec: "",
          },
        ],
      };
    },
    clearLaminatingFormData: (state) => {
      state.laminaionFormData = {
        laminationConditions: {
          lamination_id: 0,
          job_master_id: 0,
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
          substrate_id: 0,
          lamination_id: 0,
          substrate_type: "",
          supplier: "",
          dyne_level: "",
          width: "",
          thickness: "",
          density: "",
        },
        bondingMaterials: [
          {
            bonding_id: 0,
            lamination_id: 0,
            type: "Adhesive",
            code: "",
            brand: "",
            ratio: "",
          },
          {
            bonding_id: 0,
            lamination_id: 0,
            type: "Hardner",
            code: "",
            brand: "",
            ratio: "",
          },
          {
            bonding_id: 0,
            lamination_id: 0,
            type: "Ethyl",
            code: "",
            brand: "",
            ratio: "",
          },
        ],
      };
    },
    clearSavePrintingFormData: (state) => {
      state.savePrintingData = {
        printingDetails: {
          machine_settings_id: 0,
          job_master_id: 0,
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
          print_substrate_id: 0,
          machine_settings_id: 0,

          substrate_type: "",
          supplier: "",
          dyne_level: "",
          width: "",
          thickness: "",
          density: "",
        },
        stationWiseMetrics: [
          {
            station_id: 0,
            station_no: 1,
            color_pantone: "",
            lf_value: "",
            ink_supplier: "",
            lpcm: "",
            volume: "",
            uv_led: "",
            uv_led_intensity: "",
            mounting_tape: "",
            mptl_code: "",
            mixing_on_gec: "",
          },
          {
            station_id: 0,
            station_no: 2,
            color_pantone: "",
            lf_value: "",
            ink_supplier: "",
            lpcm: "",
            volume: "",
            uv_led: "",
            uv_led_intensity: "",
            mounting_tape: "",
            mptl_code: "",
            mixing_on_gec: "",
          },
          {
            station_id: 0,
            station_no: 3,
            color_pantone: "",
            lf_value: "",
            ink_supplier: "",
            lpcm: "",
            volume: "",
            uv_led: "",
            uv_led_intensity: "",
            mounting_tape: "",
            mptl_code: "",
            mixing_on_gec: "",
          },
          {
            station_id: 0,
            station_no: 4,
            color_pantone: "",
            lf_value: "",
            ink_supplier: "",
            lpcm: "",
            volume: "",
            uv_led: "",
            uv_led_intensity: "",
            mounting_tape: "",
            mptl_code: "",
            mixing_on_gec: "",
          },
          {
            station_id: 0,
            station_no: 5,
            color_pantone: "",
            lf_value: "",
            ink_supplier: "",
            lpcm: "",
            volume: "",
            uv_led: "",
            uv_led_intensity: "",
            mounting_tape: "",
            mptl_code: "",
            mixing_on_gec: "",
          },
          {
            station_id: 0,
            station_no: 6,
            color_pantone: "",
            lf_value: "",
            ink_supplier: "",
            lpcm: "",
            volume: "",
            uv_led: "",
            uv_led_intensity: "",
            mounting_tape: "",
            mptl_code: "",
            mixing_on_gec: "",
          },
          {
            station_id: 0,
            station_no: 7,
            color_pantone: "",
            lf_value: "",
            ink_supplier: "",
            lpcm: "",
            volume: "",
            uv_led: "",
            uv_led_intensity: "",
            mounting_tape: "",
            mptl_code: "",
            mixing_on_gec: "",
          },
          {
            station_id: 0,
            station_no: 8,
            color_pantone: "",
            lf_value: "",
            ink_supplier: "",
            lpcm: "",
            volume: "",
            uv_led: "",
            uv_led_intensity: "",
            mounting_tape: "",
            mptl_code: "",
            mixing_on_gec: "",
          },
          {
            station_id: 0,
            station_no: 9,
            color_pantone: "",
            lf_value: "",
            ink_supplier: "",
            lpcm: "",
            volume: "",
            uv_led: "",
            uv_led_intensity: "",
            mounting_tape: "",
            mptl_code: "",
            mixing_on_gec: "",
          },
          {
            station_id: 0,
            station_no: 10,
            color_pantone: "",
            lf_value: "",
            ink_supplier: "",
            lpcm: "",
            volume: "",
            uv_led: "",
            uv_led_intensity: "",
            mounting_tape: "",
            mptl_code: "",
            mixing_on_gec: "",
          },
        ],
      };
    },
    clearSaveLaminatingFormData: (state) => {
      state.saveLaminatingData = {
        laminationConditions: {
          lamination_id: 0,
          job_master_id: 0,
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
          substrate_id: 0,
          lamination_id: 0,
          substrate_type: "",
          supplier: "",
          dyne_level: "",
          width: "",
          thickness: "",
          density: "",
        },
        bondingMaterials: [
          {
            bonding_id: 0,
            lamination_id: 0,
            type: "Adhesive",
            code: "",
            brand: "",
            ratio: "",
          },
          {
            bonding_id: 0,
            lamination_id: 0,
            type: "Hardner",
            code: "",
            brand: "",
            ratio: "",
          },
          {
            bonding_id: 0,
            lamination_id: 0,
            type: "Ethyl",
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
      const { labelTypeId } = action.payload;
      const exists = state.selectedLabelTypeIds.some(
        (labelType) => labelType.labelTypeId === labelTypeId
      );
      if (exists) {
        state.selectedLabelTypeIds = state.selectedLabelTypeIds.filter(
          (labelId) => labelId.labelTypeId !== labelTypeId
        );
      } else {
        state.selectedLabelTypeIds.push(action.payload);
      }
    },
    setSubmitAndPublishButtonMasterData: (
      state,
      action: PayloadAction<boolean>
    ) => {
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
    setSubmitAndPublishButtonDyeCutting: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.submitAndPublishButtonDyeCutting = action.payload;
    },
    setSubmitAndPublishButtonPrinting: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.submitAndPublishButtonPrinting = action.payload;
    },
    setSubmitAndPublishButtonMasterLamination: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.submitAndPublishButtonLamination = action.payload;
    },
    setInvalidFieldsTable: (
      state,
      action: PayloadAction<{ [key: string]: boolean }>
    ) => {
      state.invalidFieldsTable = action.payload;
    },
    clearInvalidFieldsTable: (state) => {
      state.invalidFieldsTable = {};
    },
    setSearchButton: (state, action: PayloadAction<boolean>) => {
      state.searchButton = action.payload;
    },
    setFiltersPayload: (state, action: PayloadAction<FiltersPayload>) => {
      state.filtersPayload = action.payload;
    },
    setIsSearchTriggered: (state, action: PayloadAction<boolean>) => {
      state.isSearchTriggered = action.payload;
    },
    setPrintingDetails: (state, action: PayloadAction<any>) => {
      state.printingDetails = action.payload;
    },
    setDyeCuttingDetails: (state, action: PayloadAction<any>) => {
      state.dyeCuttingDetails = action.payload;
    },
    setLaminatingDetails: (state, action: PayloadAction<any>) => {
      state.laminatingDetails = action.payload;
    },
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
  setSubmitTrue,
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
  setRememberMe,
  setFiltersPayload,
  setMasterDataDetailsSave,
  setPrintingSave,
  setLaminationSave,
  setIsSearchTriggered,
  setLaminationTableValueVaidation,
  setPrintingTableValueVaidation,
  setPrintingTab,
  setLaminationTab,
  setIsLaminatingData,
  setIsPrintingData,
  setIsMasterDetailsData,
  setSaveMasterDataDetailsData,
  setSaveButtonMasterData,
  setSaveButtonLaminatingData,
  setSaveButtonPrintingData,
  setSaveLaminatingData,
  setSavePrintingData,
  clearSaveLaminatingFormData,
  clearSaveMasterDetailsData,
  clearSavePrintingFormData,
  setPrintingDropDownValues,
  setlaminationDropDownValues,
  setMountinTapeDropDownValues,
  setStructureDropDownValues,
  setSupplierPrintingDropDownValues,
  setSupplieraminationDropDownValues,
  setUpdateButton,
  setCustomerLogoFile
} = masterDataSlice.actions;
export default masterDataSlice.reducer;
