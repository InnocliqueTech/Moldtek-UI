export interface ApiStatsResponse {
  totalJobs: number | null;
  nonLaminationJobs: number | null;
  laminationJobs: number | null;
  newJobs: number | null;
}
export interface DailyJobMetricsResponse {
  statusCode: number
  message: string
  payload: null
  data: ApiStatsResponse
}

// types.ts
export interface DailyJob {
  unitEffectivityNumber: string
  jobRunDate: string
  createdAt: string
  updatedAt: string
  masterVersionNo: number
  jobType: string
  labelType: string
  status: string
  indentNumber: string | null
  customerName: string | null
  brandNamePack: string | null
  ppcIndentQty: number | null
  targetLabelsQty: number
  targetFilmMtrs: number | null
  filmRequiredForPrinting: number | null
  jarCap: string | null
  date: string | null
  shift: string
  workOrderNumber: string | null
  jobMasterId: string | null
}

export interface DailyJobsListResponse {
  statusCode: number
  statusMessage: string
  totalRecords: number
  data: DailyJob[]
}

export interface PaginationParams {
  page: number
  size: number
}
export interface FormField {
    id: string;
    label: string;
    value: string | string[];
    type?: string;
    component?: 'dropdown' | 'input';
    options?: string[];
  }
  
export interface Plan {
    id: number;
    formFields: FormField[];
  }
// types.ts
export interface InkCoatingSpecification {
  stationNo: number
  colorPantone: string
  mixingOnGec: string | null
  mtplCode: string | null
  lfValue: number
  supplierBatchNo: string | null
  uvLedIntersity: string
  lpcm: string
  vol: string
}

export interface TensionControl {
  std: {
    unwinder: number
    infeed: number
    outfeed: number
    rewinder: number
  }
  actuals: {
    unwinder: number
    infeed: number
    outfeed: number
    rewinder: number
  }
}

export interface PrintRepeatLabellingDetails {
  repeatInMM: number
  ups: number
  jarCap: string
  labelsPerMtrs: number
}

export interface MaterialSpecifications {
  widthMm: string
  thicknessMicrons: string
  gsm: string
  dyne: string
  staticCharge: number
  formatCorrection: number
}

export interface FoilRollConsumptionDetails {
  foilInputRoll: number
  foilReturnRoll: number
  consumption: number
  foilWidth: number
}

export interface ProcessReportItem {
  particular: string;
  target: number | string | null;
  rollValues: Record<string, string | number>; // allowing numbers too in case the API sends them
}


export interface MaterialUsageShiftDetails {
  plainFilmWeightPerRepeat: number
  printedFilmWeightPerRepeat: number
  inkWeightPerRepeat: number
  printingMCName: string
  leftOverRollMeters: number | null
  leftOverRollKgs: string
  operator: string
  shiftQc: string
  supervisor: string
  remarks: string
}

export interface PrintingReportResponse {
  statusCode: number
  message: string
  payload: null
  data: {
    inkCoatingSpecifications: InkCoatingSpecification[]
    tensionControl: TensionControl
    printRepeatLabellingDetails: PrintRepeatLabellingDetails
    materialSpecifications: MaterialSpecifications
    foilRollConsumptionDetails: FoilRollConsumptionDetails
    printingProcessReport: ProcessReportItem[]
    printingRunMetrics: ProcessReportItem[]
    materialUsageShiftDetails: MaterialUsageShiftDetails
  }
}
  