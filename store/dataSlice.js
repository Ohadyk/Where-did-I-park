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
        bluetoothConnected: false,
        currentRide: {
            chargedDuringTheRide: false,
            usedBluetoothDuringTheRide: false
        },
    },

    reducers: {
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

        setBatteryState(state, action) {
            state.batteryState = action.payload
        },

        setBluetoothConnected(state, action) {
            state.bluetoothConnected = action.payload
        },

        setChargedDuringTheRide(state, action) {
            state.currentRide.chargedDuringTheRide = action.payload
        },

        setIsUsedBluetoothDuringTheRide(state, action) {
            state.currentRide.usedBluetoothDuringTheRide = action.payload
        }
    }
});

export const dataActions = dataSlice.actions;
export default dataSlice.reducer;
