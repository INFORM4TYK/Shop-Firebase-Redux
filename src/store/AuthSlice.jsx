import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoggedIn: false,
  user: null,
  email: null,
  fullName: null,
  date: null,
  description: null,
  uid: null,
  avatarUrl: null,
  token: null,
  createDate: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.avatarUrl = action.payload.avatarUrl;
      state.uid = action.payload.uid;
      state.createDate = action.payload.createDate;
      state.email = action.payload.email;
      state.fullName = action.payload.fullName;
      state.date = action.payload.date;
      state.description = action.payload.description;
    },
    logout: (state, action) => {
      state.createDate = null;
      state.isLoggedIn = false;
      state.uid = null;
      state.avatarUrl = null;
      state.email = null;
      state.fullName = null;
      state.date = null;
      state.description = null;
    },
    updateUser: (state, action) => {
      state.createDate = action.payload.createDate;
      state.isLoggedIn = true;
      state.uid = action.payload.uid;
      state.avatarUrl = action.payload.avatarUrl;
      state.email = action.payload.email;
      state.fullName = action.payload.fullName;
      state.date = action.payload.date;
      state.description = action.payload.description;
    },
  },
});
export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
