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
  