import { createSlice } from '@reduxjs/toolkit';

const internalUsageDataSlice = createSlice({
    name: 'internalUsageData',
    initialState: {
        wantedAppState: 'learning',
        parkedVehicleLocation: null
    },

    reducers: {
        setWantedAppState(state, action) {
            state.wantedAppState = action.payload
        },

        setParkedVehicleLocation(state, action) {
            state.parkedVehicleLocation = action.payload
        }
    }
});

export const internalUsageDataActions = internalUsageDataSlice.actions;
export default internalUsageDataSlice.reducer;
