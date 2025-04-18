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


//--------------------- make ready API data MOdel------------------------------------------//

// types.ts
export interface DailyPlan {
  unitEffectivityNumber: string
  jobRunDate: string
  createdAt: string
  updatedAt: string
  masterVersionNo: number
  jobType: string
  labelType: string
  status: string
  indentNumber: string
  customerName: string
  brandNamePack: string
  ppcIndentQty: number
  targetLabelsQty: number
  targetFilmMtrs: number
  filmRequiredForPrinting: number | null
  jarCap: string
  date: string
  shift: string
  workOrderNumber: string
  jobMasterId: number
}

export interface GetReadyInkCoatingSpecification {
  stationNo: number
  colorPantone: string
  mixingOnGec: string | null
  mtplCode: string | null
  lfValue: number
  supplierBatchNo: string | null
  uvLedIntersity: string | null
  lpcm: string | null
  vol: string | null
}

export interface AnaloxSpecification {
  stationNo: number
  lpcm: string
  vol: string
}

export interface MountingTapeSpecification {
  stationNo: number
  stationSpec: string
}

export interface MaterialSpecification {
  widthMm: string
  thicknessMicrons: string
  gsm: string
  dyne: string
  staticCharge: number | null
  formatCorrection: number | null
}

export interface PlateMountingSupervisorReport {
  platesInspection: string | null
  mounter: string
  approver: string
  inkKitchenSupervisor: string
  plateMountingSupervisor: string
  shiftQcIncharge: string
}

export interface MakeReadyDetailsResponse {
  statusCode: number
  message: string
  payload: null
  data: {
    dailyPlan: DailyPlan
    inkCoatingSpecifications: GetReadyInkCoatingSpecification[]
    analoxSpecifications: AnaloxSpecification[]
    mountingTapeSpecifications: MountingTapeSpecification[]
    materialSpecification: MaterialSpecification
    plateMountingSupervisorReport: PlateMountingSupervisorReport
  }
}


//------------------------------Label cutting api respobse ----------------------//


// types.ts
export interface MachineConfiguration {
  machineName: string
  dieToolCode: string
  machineSpeed: string
}

export interface LabelCuttingProcessItem {
  particular: string
  target: string
  actual: string
}

export interface ApprovalRemarks {
  supervisorApproval: string
  qcApproval: string
  inchargeComments: string
  remarks: string
}

export interface LabelCuttingDetailsResponse {
  statusCode: number
  message: string
  payload: null
  data: {
    machineConfiguration: MachineConfiguration
    labelCuttingProcessReport: LabelCuttingProcessItem[]
    approvalRemarks: ApprovalRemarks
  }
}

//-------------------TravelCardApIResponse-----------------------------//

// types.ts
export interface MachineCategory {
  category: string
  target: string
  actuals: string | null
}

export interface MachineDetails {
  categories: MachineCategory[]
  jobStartingTime: string
  completionTime: string
  totalPrintingTime: string
  operator: string
  supervisor: string
  hod: string
}

export interface LabelDispatchSummary {
  requiredLabelsForDispatch: string
  dispatchedLabels: string
  balanceLabels: string
  hodComments: string
}

export interface TravelCardDetailsResponse {
  statusCode: number
  message: string
  payload: null
  data: {
    printingMachine: MachineDetails
    laminationMachine: MachineDetails
    labelCuttingMachine: MachineDetails
    labelDispatchSummary: LabelDispatchSummary
  }
}

//-------------------------------------DailyPlanFilterApi--------------------------//

export interface DailyJobsFilterParams {
  fromDate: string
  toDate: string
  customerName: string[]
  labelType: string[]
  page: number
  size: number
}