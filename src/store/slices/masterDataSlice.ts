
import { createSlice, PayloadAction } from '@reduxjs/toolkit';




export interface PrintingTableRow {
  stationNo: number;
  colorPantone: string;
  lfValue: number;
  inkSupplier: string;
  lpcm: number;
  volume: string;
  uvLed: string;
}

export interface LaminationFormData {
    zone1Temp: string;
    zone2Temp: string;
    nipPressure: string;
    speed: string;
    lamiTension: string;
    rewinderTension: string;
    printedTension: string;
    printedWidth: string;
    printedThickness: string;
    printedGSM: string;
    printedDyne: string;
    laminateTension: string;
    laminateWidth: string;
    laminateThickness: string;
    laminateGSM: string;
    laminateDyne: string;
    adhesiveCode: string;
    adhesiveBrand: string;
    adhesiveRatio: string;
    hardenerCode: string;
    hardenerBrand: string;
    hardenerRatio: string;
    ethylCode: string;
    ethylBrand: string;
    ethylRatio: string;
    materialCode: string;
    materialBrand: string;
    materialRatio: string;
    viscocityRange: string;
    adhesiveGSM: string;
  
}
export interface MasterFormData  {
  unitEffectivityNumber: string;
  typeOfLabel: string;
  jarCap: string;
  customer: string;
  itemCode: string;
  structure: string;
  brandDescription: string;
  repeat: string;
  ups: string;
  tracks: string;
  labelsPerMeter: string;
  substrateType: string;
  supplier: string;
  dyneLevel: string;
  width: string;
  thickness: string;
  density: string;
  gsm: string;
  customerPicture?: string;
}

export interface DyePrintingFormData {
  dyeCutMachineType: string,
  machine: string,
  dyeCode: string,
  runSpeed: string,
}


export interface PrintingFormValues {
  mountingType: string;
  cylinderTeeth: string;
  tension: string;
  unwinder: string;
  infeed: string;
  outfeed: string;
  rewinder: string;
  staticCharge: string;
  formatCorrect: string;
  printingTableData: PrintingTableRow[];
}

interface MasterDataState {
  selectedTab: number;
  openSider:boolean;
  updatePopup:boolean;
  submitPopupConfirm:boolean;
  submitPopup:boolean;
  submitAndPublish:boolean;
  saveFormData: MasterFormData;
  printingSaveFormData:PrintingFormValues;
  laminaionFormData:LaminationFormData;
  DyePrintingFormData:DyePrintingFormData;
}

const initialState: MasterDataState = {
  selectedTab: 0,
  openSider:false,
  updatePopup:false,
  submitPopup:false,
  submitPopupConfirm:false,
  submitAndPublish:false,
  saveFormData: {
    unitEffectivityNumber: "",
    typeOfLabel: "",
    jarCap: "",
    customer: "",
    itemCode: "",
    structure: "",
    brandDescription:
      "",
    repeat: "",
    ups: "",
    tracks: "",
    labelsPerMeter: "",
    substrateType: "",
    supplier: "",
    dyneLevel: "",
    width: "",
    thickness: "",
    density: "",
    gsm: "",
    customerPicture: ''
  },
  printingSaveFormData: {
    mountingType: "",
    cylinderTeeth: "",
    tension: "",
    unwinder: "",
    infeed: "",
    outfeed: "",
    rewinder: "",
    staticCharge: "",
    formatCorrect: "",
    printingTableData:
     [
      {
        stationNo: 1,
        colorPantone: '',
        lfValue: 0,
        inkSupplier:"",
        lpcm: 0,
        volume: '',
        uvLed: '',
      },
      {
        stationNo: 2,
        colorPantone: '',
        lfValue: 0,
        inkSupplier:"",
        lpcm: 0,
        volume: '',
        uvLed: '',
      },
      {
        stationNo: 3,
        colorPantone: '',
        lfValue: 0,
        inkSupplier:"",
        lpcm: 0,
        volume: '',
        uvLed: '',
      },
      {
        stationNo: 4,
        colorPantone: '',
        lfValue: 0,
        inkSupplier:"",
        lpcm: 0,
        volume: '',
        uvLed: '',
      },
      {
        stationNo: 5,
        colorPantone: '',
        lfValue: 0,
        inkSupplier:"",
        lpcm: 0,
        volume: '',
        uvLed: '',
      },
      {
        stationNo: 6,
        colorPantone: '',
        lfValue: 0,
        inkSupplier:"",
        lpcm: 0,
        volume: '',
        uvLed: '',
      },
      {
        stationNo: 7,
        colorPantone: '',
        lfValue: 0,
        inkSupplier:"",
        lpcm: 0,
        volume: '',
        uvLed: '',
      },
      {
        stationNo: 8,
        colorPantone: '',
        lfValue: 0,
        inkSupplier:"",
        lpcm: 0,
        volume: '',
        uvLed: '',
      },
      {
        stationNo: 9,
        colorPantone: '',
        lfValue: 0,
        inkSupplier:"",
        lpcm: 0,
        volume: '',
        uvLed: '',
      },
      {
        stationNo: 10,
        colorPantone: '',
        lfValue: 0,
        inkSupplier:"",
        lpcm: 0,
        volume: '',
        uvLed: '',
      }
    ]
  },
  laminaionFormData:{
    zone1Temp: "",
    zone2Temp: "",
    nipPressure: "",
    speed: "",
    lamiTension: "",
    rewinderTension: "",
    printedTension: "",
    printedWidth: "",
    printedThickness: "",
    printedGSM: "",
    printedDyne: "",
    laminateTension: "",
    laminateWidth: "",
    laminateThickness: "",
    laminateGSM: "",
    laminateDyne: "",
    adhesiveCode: "",
    adhesiveBrand: "",
    adhesiveRatio: "",
    hardenerCode: "",
    hardenerBrand: "",
    hardenerRatio: "",
    ethylCode: "",
    ethylBrand: "",
    ethylRatio: "",
    materialCode: "",
    materialBrand: "",
    materialRatio: "",
    viscocityRange: "",
    adhesiveGSM: "",
  },
  DyePrintingFormData:{
    dyeCutMachineType: "",
    machine: "",
    dyeCode: "",
    runSpeed: "",
  }
  
};

const masterDataSlice = createSlice({
  name: 'masterData',
  initialState,
  reducers: {
    setSelectedTab: (state, action: PayloadAction<number>) => {
      state.selectedTab = action.payload;
    },
    setOpenSlider:(state,action:PayloadAction<boolean>) =>{
      state.openSider = action.payload
    },
    setUploadPopup:(state,action:PayloadAction<boolean>) =>{
    state.updatePopup =  action.payload
    },
    setSubmitPopupConfirm:(state,action:PayloadAction<boolean>)=>{
     state.submitPopupConfirm = action.payload
    },
    setSubmitPopup:(state,action:PayloadAction<boolean>)=>{
    state.submitPopup = action.payload
    },
    setSubmitAndPublishPopup:(state,action:PayloadAction<boolean>)=>{
      state.submitAndPublish = action.payload
    },
    setSaveFormData: (state, action: PayloadAction<MasterFormData>) => {
      state.saveFormData = { ...state.saveFormData, ...action.payload };
    },
    setSavePrintingFormData: (state, action: PayloadAction<PrintingFormValues>) => {
      state.printingSaveFormData = { ...state.printingSaveFormData, ...action.payload };
    },
    setLaminationFormData:(state,action:PayloadAction<LaminationFormData>)=>{
      state.laminaionFormData = {...state.laminaionFormData,...action.payload}
    },
    setDyePrintingFormData:(state,action:PayloadAction<DyePrintingFormData>)=>{
      state.DyePrintingFormData = {...state.DyePrintingFormData,...action.payload}
    }
    
    
  },
});

export const { setSelectedTab,setOpenSlider,setUploadPopup,setSubmitPopupConfirm,setSubmitPopup,setSubmitAndPublishPopup,setSaveFormData,setSavePrintingFormData,setLaminationFormData,setDyePrintingFormData } = masterDataSlice.actions;
export default masterDataSlice.reducer;
