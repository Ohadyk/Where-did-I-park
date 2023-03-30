import { createSlice } from '@reduxjs/toolkit';

const internalUsageDataSlice = createSlice({
    name: 'internalUsageData',
    initialState: {
        wantedAppState: 'learning',
        parkedVehicleLocation: null,
        probablyParkingLocations: []
    },

    reducers: {
        setWantedAppState(state, action) {
            state.wantedAppState = action.payload
        },

        setParkedVehicleLocation(state, action) {
            state.parkedVehicleLocation = action.payload
        },

        setProbablyParkingLocations(state, action) {
            state.probablyParkingLocations = action.payload
        }

    }
});

export const internalUsageDataActions = internalUsageDataSlice.actions;
export default internalUsageDataSlice.reducer;
