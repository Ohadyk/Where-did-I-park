import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        uid: ''
    },

    reducers: {
        setUid(state, action) {
            state.uid = action.payload;
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
