// src/slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the state type
interface MasterDataState {
  selectedTab: number;
  openSider:boolean;
  updatePopup:boolean;
  submitPopupConfirm:boolean;
  submitPopup:boolean
}

// Define the initial state with types
const initialState: MasterDataState = {
  selectedTab: 0,
  openSider:false,
  updatePopup:false,
  submitPopup:false,
  submitPopupConfirm:false
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
    }
  },
});

export const { setSelectedTab,setOpenSlider,setUploadPopup,setSubmitPopupConfirm,setSubmitPopup } = masterDataSlice.actions;
export default masterDataSlice.reducer;
