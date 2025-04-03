// src/slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the state type
interface MasterDataState {
  selectedTab: number;
}

// Define the initial state with types
const initialState: MasterDataState = {
  selectedTab: 0,
};

const masterDataSlice = createSlice({
  name: 'masterData',
  initialState,
  reducers: {
    setSelectedTab: (state, action: PayloadAction<number>) => {
      state.selectedTab = action.payload;
    },
  },
});

export const { setSelectedTab } = masterDataSlice.actions;
export default masterDataSlice.reducer;
