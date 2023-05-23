import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import dataSlice from "./dataSlice";
import internalUsageDataSlice from "./internalUsageDataSlice";
import uiSlice from "./uiSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        data: dataSlice,
        ui: uiSlice,
        internalUsageData: internalUsageDataSlice
    }
})

export default store;
