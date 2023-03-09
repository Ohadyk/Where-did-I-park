import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import dataSlice from "./dataSlice";
import internalUsageDataSlice from "./internalUsageDataSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        data: dataSlice,
        internalUsageData: internalUsageDataSlice
    }
})

export default store;
