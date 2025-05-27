export interface PrintingTableRow {
  station_id: number;
  station_no: number;
  color_pantone: string;
  lf_value: string;
  ink_supplier: string;
  lpcm: string;
  volume: string;
  uv_led: string;
  uv_led_intensity: string;
  mounting_tape: string;
  mptl_code: string;
  mixing_on_gec: string;
}
export interface LaminatingTableRow {
  bonding_id: number;
  lamination_id: number;
  type: string;
  code: string;
  brand: string;
  ratio: string;
}
export interface RequestPayload {
  masterDataDetails: {
    job_master_id: number;
    unit_effectivity_number: string;
    customer_name: string;
    customer_logo: string;
    item_code: string;
    brand_description: string;
    jar_cap: string;
    segment: string;
    structure: string;
    label_type: string;
    repeat_length: number;
    ups: number;
    tracks: number;
  };
  masterDataPrinting: {
    printingDetails: {
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
    };
    printingSubstrateSettings: {
      print_substrate_id: number;
      machine_settings_id: number;
      substrate_type: string;
      supplier: string;
      dyne_level: string;
      width: number;
      thickness: number;
      density: number;
    };
    stationWiseMetrics: {
      station_id: number;
      station_no: number;
      color_pantone: string;
      lf_value: number;
      ink_supplier: string;
      lpcm: number;
      volume: string;
      uv_led: string;
      uv_led_intensity: string;
      mounting_tape: string;
      mptl_code: number;
      mixing_on_gec: number;
    }[];
  };
  masterDataLamination: {
    laminationConditions: {
      lamination_id: number;
      job_master_id: number;
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
      substrate_id: number;
      lamination_id: number;
      substrate_type: string;
      supplier: string;
      dyne_level: string;
      width: number;
      thickness: number;
      density: number;
    };
    bondingMaterials: {
      bonding_id: number;
      lamination_id: number;
      type: string;
      code: string;
      brand: string;
      ratio: number;
    }[];
  };
  masterDataDyeCutting: {
    dye_cutting_id: number;
    job_master_id: number;
    machine_type: string;
    machine_name: string;
    dye_code: string;
    run_speed: number;
  };
}

export interface LaminationFormData {
  laminationConditions: {
    lamination_id: number;
    job_master_id: number;
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
    substrate_id: number;
    lamination_id: number;
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
  job_master_id: number;
  unit_effectivity_number: string;
  customer_name: string;
  customer_logo: string;
  jar_cap: string;
  segment: string;
  item_code: string;
  structure: string;
  brand_description: string;
  label_type: string;
  repeat_length: string;
  ups: string;
  tracks: string;
  noOfColorsSetting: string;
  noOfSpecialColors: string;
}

export interface DyeCuttingFormData {
  dye_cutting_id: number;
  job_master_id: number;
  machine_type: string;
  machine_name: string;
  dye_code: string;
  run_speed: string;
}
export interface MasterDataFormErrors {
  job_master_id: string;
  repeat_length: string;
  ups: string;
  tracks: string;
  unit_effectivity_number: string;
  customer_name: string;
  customer_logo: string;
  jar_cap: string;
  segment: string;
  item_code: string;
  structure: string;
  brand_description: string;
  label_type: string;
  noOfColorsSetting: string;
  noOfSpecialColors: string;
}
export interface DyeCuttingFormErrors {
  job_master_id: string;
  dye_cutting_id: string;
  machine_type: string;
  machine_name: string;
  dye_code: string;
  run_speed: string;
}

export interface PrintingFormErrors {
  cylinder_teeth: string;
  tension: string;
  static_charge: string;
  format_correct: string;
  dyne_level: string;
  width: string;
  thickness: string;
  density: string;
  color_pantone: string;
  lf_value: string;
  ink_supplier: string;
  lpcm: string;
  volume: string;
  uv_led: string;
  uv_led_intensity: string;
  mixing_on_gec: string;
  mptl_code: string;
  mounting_tape: string;
  [key: string]: string;
}
export interface LaminationFormErrors {
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
  substrate_type: string;
  supplier: string;
  dyne_level: string;
  width: string;
  thickness: string;
  density: string;
  [key: string]: string;
}

export interface PrintingFormValues {
  printingDetails: {
    machine_settings_id: number;
    job_master_id: number;
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
    print_substrate_id: number;
    machine_settings_id: number;
    substrate_type: string;
    supplier: string;
    dyne_level: string;
    width: string;
    thickness: string;
    density: string;
  };
  stationWiseMetrics: PrintingTableRow[];
}
export interface Customer {
  customerId: number;
  firstName: string;
  lastName: string;
  fullName: string;
}
export interface LabelType {
  labelTypeId: number;
  labelTypeName: string;
}
export interface FiltersPayload {
  fromDate: string;
  toDate: string;
  customerName: string[];
  labelType: string[];
  searchField: string;
}
export interface MasterDataNotifications {
exceptionMessage: string|null;
fileName: string;
fileReadStatus:string;
id: number;
processedOn: string;
unitEffectiveNumbers: string
}
export interface MasterDataState {
  masterDataNotifications:MasterDataNotifications[]
  popOver:boolean
  needUpload:boolean;
  selectedFile: File | null;
  uploadFile: File | null;
  customerLogoFile: File | null;
  noOfColorsSetting: string;
  noOfSpecialColors: string;
  updateButton: boolean;
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
  printingTab: boolean;
  laminationTab: boolean;
  updatePopup: boolean;
  submitPopupConfirm: boolean;
  submitPopup: boolean;
  submitAndPublish: boolean;
  saveFormData: MasterFormData;
  saveMasterDataDetailsData: MasterFormData;
  printingSaveFormData: PrintingFormValues;
  savePrintingData: PrintingFormValues;
  laminaionFormData: LaminationFormData;
  saveLaminatingData: LaminationFormData;
  dyeCuttingFormData: DyeCuttingFormData;
  isDyeCuttingDataSave: boolean;
  isMasterDetaisDataSave: boolean;
  isPrintingDataSave: boolean;
  isLaminationDataSave: boolean;
  isMasterDetaisData: boolean;
  isPrintingData: boolean;
  isLaminationData: boolean;
  requestPayload: RequestPayload;
  selectedUEN: string;
  submitAndPublishButtonMasterData: boolean;
  masterDataDetailsSave: boolean;
  submitAndPublishButtonDyeCutting: boolean;
  submitAndPublishButtonPrinting: boolean;
  submitAndPublishButtonLamination: boolean;
  masterDataFormErrors: MasterDataFormErrors;
  invalidFieldsTable: { [key: string]: boolean };
  printingFormErrors: PrintingFormErrors;
  laminationFormErrors: LaminationFormErrors;
  laminationDataTouched: boolean;
  printingDataTouched: boolean;
  dyeCuttingDataTouched: boolean;
  masterDataDataTouched: boolean;
  searchButton: boolean;
  filtersPayload: FiltersPayload;
  printingDataSave: boolean;
  laminationDataSave: boolean;
  isSearchTriggered: boolean;
  printingDetails: any;
  dyeCuttingDetails: any;
  laminatingDetails: any;
  rememberMe: boolean;
  submitTrue: boolean;
  laminationTableValueVaidation: boolean;
  printingTableValueVaidation: boolean;
  saveButtonMasterData: boolean;
  saveButtonPrintingData: boolean;
  saveButtonLaminatingData: boolean;
  dropDownValuesPrinting: any;
  dropDownValuesLamination: any;
  dropDownValuesSupplierLamination: any;
  dropDownValuesSupplierPrinting: any;
  dropDownValuesMountingTape: any;
  dropDownValuesStructure: any;
}
