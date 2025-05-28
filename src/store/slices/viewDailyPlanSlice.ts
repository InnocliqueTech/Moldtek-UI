import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setPopOver } from "./masterDataSlice";

interface DailyPlan {
  unitEffectivityNumber: string;
  indentNumber: string;
  customerName: string;
  brandNamePack: string;
  ppcIndentQty: number;
  targetLabelsQty: number;
  targetFilmMtrs: number;
  filmRequiredPrintingMtrs: number | null;
  jarCap: string;
  date: string;
  shift: string;
  workOrderNumber: string;
  jobMasterId: number;
  labelType:string;
  segment:string;
}

export interface InkCoatingSpecification {
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

export interface DailyPlanNotifications {
exceptionMessage: string|null;
fileName: string;
status:string;
id: number;
processedOn: string;
unitEffectiveNumbers: string
}
export interface FiltersPayload {
  fromDate: string,
  toDate: string,
  customerName: string[],
  labelType: string[],
  searchField :string,
  searchType:string,
  status:string[]
}
export interface viewDailyPlan {
  dailyPlanDataNotifications:DailyPlanNotifications[]
  dailyPlanCancel:boolean;
  dailyPlanSave:boolean;
  customers: Customer[];
  labelTypes: LabelType[];
  selectedLabelTypeIds: LabelType[];
  selectedCustomers: Customer[];
  selectedCustomersData: {
    customers: Customer[];
  };
  dailyPlan: DailyPlan;
  inkCoatingSpecifications: InkCoatingSpecification[];
  analoxSpecifications: AnaloxSpecification[];
  mountingTapeSpecifications: any[];
  materialSpecification: MaterialSpecification;
  plateMountingSupervisorReport: PlateMountingSupervisorReport; 
  openSliderDaily: boolean;
  filtersPayload: FiltersPayload
  isSearchTriggered: boolean
  updateDailyPlanPayload: any,
  updateCommonCard:{
    shift: string,
    workOrderNumber: string
  },
  dropDown:boolean;
  isEditing:boolean;
  hasUnsavedChanges:boolean;
  showTabChangeDialog:boolean;
  sideNavigationAllowed:boolean;
  backButtonNavigationAllowed:boolean;
  recentlyCreatedIndentNumber:string;
  popOverDailyPlan:boolean
}

const initialState: viewDailyPlan = {
  dailyPlanDataNotifications:[{
exceptionMessage: "",
fileName: "",
status: "",
id: 0,
processedOn: "",
unitEffectiveNumbers: ""}],
  popOverDailyPlan:false,
  dailyPlanSave:false,
  sideNavigationAllowed:false,
  backButtonNavigationAllowed:false,
  hasUnsavedChanges:false,
  showTabChangeDialog:false,
  dropDown:false,
  filtersPayload:{
    fromDate: "",
    toDate: "",
    customerName: [],
    labelType: [],
    searchField :'',
    searchType:'',
    status:[]
  },
  customers: [],
  labelTypes: [],
  selectedLabelTypeIds: [],
  selectedCustomers: [],
  selectedCustomersData: {
    customers: [],
  },
  dailyPlan: {
    unitEffectivityNumber: "",
    indentNumber: "",
    customerName: "",
    brandNamePack: "",
    ppcIndentQty: 0,
    targetLabelsQty: 0,
    targetFilmMtrs: 0,
    filmRequiredPrintingMtrs: null,
    jarCap: "",
    date: "",
    shift: "",
    workOrderNumber: "",
    jobMasterId: 0,
    labelType:"",
    segment:""
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
  plateMountingSupervisorReport: {
    platesInspection: null,
    mounter: "",
    approver: "",
    inkKitchenSupervisor: "",
    plateMountingSupervisor: "",
    shiftQcIncharge: ""
  },
  openSliderDaily: false,
  isSearchTriggered: false,
  updateDailyPlanPayload: {},
  updateCommonCard:{
    shift: "",
    workOrderNumber: ""
  },
  isEditing:false,
  dailyPlanCancel:false,
  recentlyCreatedIndentNumber:""
};

const ViewDailyPanSlice = createSlice({
  name: "viewDailyPanSlice",
  initialState,
  reducers: {
        setDailyPlanDataNotifications:(state,action:PayloadAction<DailyPlanNotifications[]>)=>{
        state.dailyPlanDataNotifications=action.payload
        },
    setPopOverDailyPlan:(state,action:PayloadAction<boolean>)=>{
     state.popOverDailyPlan = action.payload
    },
    setDailyPlanSave:(state,action:PayloadAction<boolean>)=>{
     state.dailyPlanSave = action.payload
    },
    setDailyPlanCancel:(state,action:PayloadAction<boolean>)=>{
     state.dailyPlanCancel = action.payload
    },
    setDailyPlan: (state, action: PayloadAction<DailyPlan>) => {
      state.dailyPlan = action.payload;
    },
    setInkCoatingSpecifications: (state, action: PayloadAction<InkCoatingSpecification[]>) => {
      state.inkCoatingSpecifications = action.payload
    },
    setAnaloxSpecifications: (state, action: PayloadAction<AnaloxSpecification[]>) => {
      state.analoxSpecifications = action.payload
    },
    setMountingTapeSpecifications: (state, action: PayloadAction<any[]>) => {
      state.mountingTapeSpecifications = action.payload
    },
    setMaterialSpecification: (state, action: PayloadAction<MaterialSpecification>) => {
      state.materialSpecification = action.payload
    },
    setPlateMountingSupervisorReport: (state, action: PayloadAction<any>) => {
      state.plateMountingSupervisorReport = action.payload
    },
    setOpenSliderDaily: (state, action: PayloadAction<boolean>) => {
      state.openSliderDaily = action.payload;
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
      const exists = state.selectedLabelTypeIds.some((labelType) => labelType.labelTypeId === labelTypeId);
      if (exists) {
        state.selectedLabelTypeIds = state.selectedLabelTypeIds.filter(
          (labelId) => labelId.labelTypeId !== labelTypeId
        );
      } else {
        state.selectedLabelTypeIds.push(action.payload);
      }
    },
    setFiltersPayload: (state, action: PayloadAction<FiltersPayload>) => {
      state.filtersPayload = action.payload
    },
    setIsSearchTriggered: (state, action: PayloadAction<boolean>) => {
      state.isSearchTriggered = action.payload
    },
    setUpdateDailyPlanPayload : (state, action: PayloadAction<any>) => {
      state.updateDailyPlanPayload = action.payload
    },
    clearUpdateDailyPlanPayload: (state) =>{
      state.updateDailyPlanPayload = {}
    },
    setUpdateCommonCard : (state,action: PayloadAction<{
      shift: string,
      workOrderNumber: string
    
  }>) => {
      state.updateCommonCard = action.payload
    },
    setDropDown:(state,action:PayloadAction<boolean>)=>{
      state.dropDown = action.payload
    },
    setIsEditing : (state, action:PayloadAction<boolean>) => {
      state.isEditing = action.payload
    },
    setHasUnsavedChanges:(state,action:PayloadAction<boolean>)=>{
      state.hasUnsavedChanges= action.payload
    } ,
    setShowTabChangeDialog:(state,action:PayloadAction<boolean>)=>{
      state.showTabChangeDialog= action.payload
    } ,
    setSideNavigationAllowed:(state,action:PayloadAction<boolean>)=>{
      state.sideNavigationAllowed = action.payload
    },
    setBackButtonNavigationAllowed:(state,action:PayloadAction<boolean>)=>{
      state.backButtonNavigationAllowed = action.payload
    },
    setRecentlyCreatedIndentNumber:(state, action:PayloadAction<string>)=>{
      state.recentlyCreatedIndentNumber = action.payload;
    }
   },
});

export const {
  setSideNavigationAllowed,
  setBackButtonNavigationAllowed,
  setDailyPlan,
  setAnaloxSpecifications,
  setInkCoatingSpecifications,
  setMaterialSpecification,
  setMountingTapeSpecifications,
  setPlateMountingSupervisorReport,
  setOpenSliderDaily,
  setCustomers,
  setFiltersPayload,
  setSelectedLabelTypeIds,
  setLabelTypes,
  setSelectedCustomers,
  toggleCustomerSelection,
  toggleLabelType,
  setIsSearchTriggered,
  setUpdateDailyPlanPayload,
  clearUpdateDailyPlanPayload,
  setUpdateCommonCard,
  setDropDown,
  setIsEditing,
  setHasUnsavedChanges,
  setShowTabChangeDialog,
  setDailyPlanSave,
  setDailyPlanCancel,
  setRecentlyCreatedIndentNumber,
  setPopOverDailyPlan,
  setDailyPlanDataNotifications
} = ViewDailyPanSlice.actions;
export default ViewDailyPanSlice.reducer;
