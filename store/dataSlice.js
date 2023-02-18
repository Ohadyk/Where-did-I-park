import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
    name: 'data',
    initialState: {
        userData: {
            appState: 'learning',
            connectToCharger: false,
            connectToBluetooth: false
        },
    },

    reducers: {
        setUserData(state, action) {
            state.userData = action.payload
        },
    }
});

export const dataActions = dataSlice.actions;
export default dataSlice.reducer;
