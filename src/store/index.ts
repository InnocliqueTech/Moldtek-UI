// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './services/api'; 
import masterDataReducer from './slices/masterDataSlice';

export const store = configureStore({
  reducer: {
    masterData: masterDataReducer,
    [apiSlice.reducerPath]: apiSlice.reducer, // Adding RTK Query reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Adding RTK Query middleware
});

export type RootState = ReturnType<typeof store.getState>; 
export type AppDispatch = typeof store.dispatch; 
