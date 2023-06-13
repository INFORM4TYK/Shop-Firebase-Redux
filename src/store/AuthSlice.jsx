import { createSlice } from "@reduxjs/toolkit";
const initialState={
    isLoggedIn: false,
    user: null,
    fullName: null,
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload.user
            state.fullName = action.payload.fullName
        },
        logout: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
            state.fullName = null;
        }
    }
})
export const {login, logout} = authSlice.actions;
export default authSlice.reducer;