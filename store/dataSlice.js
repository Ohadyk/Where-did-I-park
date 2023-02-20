import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
    name: 'data',
    initialState: {
        LearnedUserData: {
            appState: 'learning',
            userConnectingToCharger: false,
            userConnectingToBluetooth: false
        },
        isOnRide: false,
        currentSpeed: 0,
        currentLocation: {
            latitude: 0,
            longitude: 0
        },
        isCharging: false,
        isUsingBluetooth: false,
    },

    reducers: {
        setLearnedUserData(state, action) {
            state.userData = action.payload
        },

        setIsOnRide(state, action) {
            state.isOnRide = action.payload
        },

        setCurrentSpeed(state, action) {
            state.currentSpeed = action.payload
        },

        setCurrentLocation(state, action) {
            state.currentLocation = action.payload
        },

        setIsCharging(state, action) {
            state.isCharging = action.payload
        },

        setIsUsingBluetooth(state, action) {
            state.isUsingBluetooth = action.payload
        }
    }
});

export const dataActions = dataSlice.actions;
export default dataSlice.reducer;
