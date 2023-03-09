import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
    name: 'data',
    initialState: {
        appState: 'learning',
        userConnectingToCharger: false,
        userConnectingToBluetooth: false,
        numOfLearnedRides: 0,
        learnedRides: [],
        currentLocation: {
            latitude: 31.768319,
            longitude: 35.21371,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
        },
        currentSpeed: 0,
        isOnRide: false,
        batteryState: 'unplugged',
        bluetoothState: false,
        currentRide: {
            chargedDuringTheRide: false,
            usedBluetoothDuringTheRide: false
        },
    },

    reducers: {
        toggleAppState(state, action) {
            if(state.appState === 'learning') {
                state.appState = 'stable'
            }
            else {
                state.appState = 'learning'
            }
        },

        setAppState(state, action) {
            state.appState = action.payload
        },

        setUserConnectingToCharger(state, action) {
            state.userConnectingToCharger = action.payload
        },

        setUserConnectingToBluetooth(state, action) {
            state.userConnectingToBluetooth = action.payload
        },

        setNumOfLearnedRides(state, action) {
            state.numOfLearnedRides = action.payload
        },

        incNumOfLearnedRides(state, action) {
            state.numOfLearnedRides = state.numOfLearnedRides + 1
        },

        resetNumOfLearnedRides(state, action) {
            state.numOfLearnedRides = 0
        },

        setLearnedRides(state, action) {
            state.learnedRides = action.payload
        },

        addLearnedRide(state, action) {
            state.learnedRides.push(action.payload)
        },

        resetLearnedRides(state, action) {
            state.learnedRides = []
        },

        setCurrentLocation(state, action) {
            state.currentLocation = action.payload
        },

        setCurrentSpeed(state, action) {
            state.currentSpeed = action.payload
        },

        setIsOnRide(state, action) {
            state.isOnRide = action.payload
        },

        setIsCurrentlyCharging(state, action) {
            state.currentRide.isCurrentlyCharging = action.payload
        },

        setIsCurrentlyUsingBluetooth(state, action) {
            state.currentRide.isCurrentlyUsingBluetooth = action.payload
        },

        setBatteryState(state, action) {
            state.batteryState = action.payload
        }
    }
});

export const dataActions = dataSlice.actions;
export default dataSlice.reducer;
