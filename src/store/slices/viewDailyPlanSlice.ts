import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DailyPlan {
  unitEffectivityNumber: string;
  indentNumber: string;
  customerName: string;
  brandNamePack: string;
  ppcIndentQty: number;
  targetLabelsQty: number;
  targetFilmMtrs: number;
  filmRequiredForPrinting: number | null;
  jarCap: string;
  date: string;
  shift: string;
  workOrderNumber: string;
  jobMasterId: number;
}

interface InkCoatingSpecification {
  stationNo: number;
  colorPantone: string;
  mixingOnGec: string | null;
  mtplCode: string | null;
  lfValue: number;
  supplierBatchNo: string | null;
}

interface AnaloxSpecification {
  stationNo: number;
  lpcm: string;
  vol: string;
}

interface MaterialSpecification {
  widthMm: string;
  thicknessMicrons: string;
  gsm: string;
  dyne: string;
}

interface PlateMountingSupervisorReport {
  platesInspection: string | null
  mounter: string
  approver: string
  inkKitchenSupervisor: string
  plateMountingSupervisor: string
  shiftQcIncharge: string
}

export interface viewDailyPlan {
  dailyPlan: DailyPlan;
  inkCoatingSpecifications: InkCoatingSpecification[];
  analoxSpecifications: AnaloxSpecification[];
  mountingTapeSpecifications: any[];
  materialSpecification: MaterialSpecification;
  plateMountingSupervisorReport: PlateMountingSupervisorReport; 
}

const initialState: viewDailyPlan = {
  dailyPlan: {
    unitEffectivityNumber: "",
    indentNumber: "",
    customerName: "",
    brandNamePack: "",
    ppcIndentQty: 0,
    targetLabelsQty: 0,
    targetFilmMtrs: 0,
    filmRequiredForPrinting: null,
    jarCap: "",
    date: "",
    shift: "",
    workOrderNumber: "",
    jobMasterId: 0,
  },
  inkCoatingSpecifications: [],
  analoxSpecifications: [],
  mountingTapeSpecifications: [],
  materialSpecification: {
    widthMm: "",
    thicknessMicrons: "",
    gsm: "",
    dyne: "",
  },
  plateMountingSupervisorReport: null,
};

const ViewDailyPanSlice = createSlice({
  name: "viewDailyPanSlice",
  initialState,
  reducers: {
    setDailyPlan: (state, action: PayloadAction<DailyPlan>) => {
      state.dailyPlan = action.payload;
    },
    setInkCoatingSpecifications:(state, action: PayloadAction<InkCoatingSpecification[]>) => {
      state.inkCoatingSpecifications = action.payload
    },
    setAnaloxSpecifications:(state,action:PayloadAction<AnaloxSpecification[]>)=>{
      state.analoxSpecifications=action.payload
    },
    setMountingTapeSpecifications:(state,action:PayloadAction<any[]>)=>{
      state.mountingTapeSpecifications=action.payload
    },
    setMaterialSpecification:(state,action:PayloadAction<MaterialSpecification>)=>{
      state.materialSpecification=action.payload
    },
    setPlateMountingSupervisorReport:(state,action:PayloadAction<any>)=>{
      state.plateMountingSupervisorReport=action.payload
    },
  },
});

export const { setDailyPlan,setAnaloxSpecifications,setInkCoatingSpecifications,setMaterialSpecification,setMountingTapeSpecifications,setPlateMountingSupervisorReport } = ViewDailyPanSlice.actions;
export default ViewDailyPanSlice.reducer;
