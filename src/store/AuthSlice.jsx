import { createSlice } from "@reduxjs/toolkit";
const initialState={
    isLoggedIn: false,
    user: null,
    email: null,
    fullName: null,
    date: null,
    description: null,
    uid: null,
    token: null,
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            // state.user = action.payload.user;
            state.uid = action.payload.uid
            state.email = action.payload.email
            state.fullName = action.payload.fullName
            state.date = action.payload.date
            state.description = action.payload.description
            state.token = action.payload.token
        },
        logout: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
            state.fullName = null;
            state.date = null;
            state.description = null;
        },
        updateUser: (state, action) => {
            state.isLoggedIn = true;
            // state.user = action.payload.user;
            state.uid = action.payload.uid
            state.email = action.payload.email
            state.fullName = action.payload.fullName
            state.date = action.payload.date
            state.description = action.payload.description
        },
    }
})
export const {login, logout,updateUser} = authSlice.actions;
export default authSlice.reducer;