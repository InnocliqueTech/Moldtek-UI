// src/slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the state type
interface MasterDataState {
  selectedTab: number;
  openSider:boolean
}

// Define the initial state with types
const initialState: MasterDataState = {
  selectedTab: 0,
  openSider:false
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
    }
  },
});

export const { setSelectedTab,setOpenSlider } = masterDataSlice.actions;
export default masterDataSlice.reducer;
