// src/slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the state type
interface UserState {
  userInfo: string | null;
}

// Define the initial state with types
const initialState: UserState = {
  userInfo: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<string | null>) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setUserInfo } = userSlice.actions;
export default userSlice.reducer;
