import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { expenseSlice } from "./expenseSlice";

export const store = configureStore({
  reducer: { auth: authSlice.reducer, expense: expenseSlice.reducer },
});
