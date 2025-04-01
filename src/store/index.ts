// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './services/api'; // Import API slice
import userReducer from './slices/userSlice'; // Import other slices if needed

export const store = configureStore({
  reducer: {
    user: userReducer, // Adding custom slices
    [apiSlice.reducerPath]: apiSlice.reducer, // Adding RTK Query reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Adding RTK Query middleware
});

export type RootState = ReturnType<typeof store.getState>; // Type for the entire Redux state
export type AppDispatch = typeof store.dispatch; // Type for dispatching actions
