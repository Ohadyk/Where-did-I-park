import { createSlice } from '@reduxjs/toolkit';

const internalUsageDataSlice = createSlice({
    name: 'internalUsageData',
    initialState: {
        wantedAppState: 'learning',
        parkedVehicleLocation: null,
        probablyParkingLocations: [],
        wrongDetectedParking: 0
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
        },

        setWrongDetectedParking(state, action) {
            state.wrongDetectedParking = action.payload
        }

    }
});

export const internalUsageDataActions = internalUsageDataSlice.actions;
export default internalUsageDataSlice.reducer;
