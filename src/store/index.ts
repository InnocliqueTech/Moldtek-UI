
import { configureStore } from '@reduxjs/toolkit';
import { masterDataApi } from './apis/masterDataApis'; 
import {dailyPlanApi} from './apis/dailyPlanApis';
import { authenticationApi } from './apis/authenticationApis';
import { genericApi } from './apis/genericApis';
import masterDataReducer from './slices/masterDataSlice';
import viewMasterDataReducer from './slices/viewMasterDataSlice'
import  viewDailyPlanReducer  from './slices/viewDailyPlanSlice';

export const store = configureStore({
  reducer: {
    masterData: masterDataReducer,
    viewMasterData: viewMasterDataReducer,
    viewDailyPlan:viewDailyPlanReducer,
    [masterDataApi.reducerPath]: masterDataApi.reducer,
    [dailyPlanApi.reducerPath]: dailyPlanApi.reducer,
     [authenticationApi.reducerPath]: authenticationApi.reducer,
      [genericApi.reducerPath]: genericApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(masterDataApi.middleware)
      .concat(dailyPlanApi.middleware)
      .concat(authenticationApi.middleware)
      .concat(genericApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>; 
export type AppDispatch = typeof store.dispatch; 
