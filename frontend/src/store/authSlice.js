import { createSlice } from "@reduxjs/toolkit";

const tokenInitial = localStorage.getItem("token");

const initialState = { isAuthenticated: false, token: tokenInitial };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const authActions = authSlice.actions;
