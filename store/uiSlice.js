import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        showPermissionsModal: true
    },

    reducers: {
        setShowPermissionsModal(state, action) {
            state.showPermissionsModal = action.payload;
        }
    }
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
