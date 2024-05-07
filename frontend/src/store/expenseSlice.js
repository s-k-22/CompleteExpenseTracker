import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { expenses: [] };

export const getExpenses = createAsyncThunk("expense/getExpenses", async () => {
  const response = await axios.get(
    "http://localhost:5000/expenses/getExpenses",
    {
      headers: { Authorization: localStorage.getItem("token") },
    }
  );
  return response.data.map((exp) => exp);
});

export const addExpense = createAsyncThunk(
  "expense/addExpense",
  async (expense) => {
    const response = await axios.post(
      "http://localhost:5000/expenses/addExpense",
      expense,
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
    return response.data;
  }
);

export const editExpense = createAsyncThunk(
  "expense/editExpense",
  async (expense) => {
    const response = await axios.put(
      "http://localhost:5000/expenses/editExpense",
      expense,
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
    return response.data;
  }
);

export const deleteExpense = createAsyncThunk(
  "expense/deleteExpense",
  async (id) => {
    const response = await axios.delete(
      `http://localhost:5000/expenses/deleteExpense/${id}`
    );
    return response.data;
  }
);

export const expenseSlice = createSlice({
  name: "expense",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getExpenses.fulfilled, (state, action) => {
        state.expenses = action.payload;
        localStorage.setItem("expenses", JSON.stringify(state.expenses));
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.expenses.push(action.payload);
        localStorage.setItem("expenses", JSON.stringify(state.expenses));
      })
      .addCase(editExpense.fulfilled, (state, action) => {
        state.expenses = state.expenses.map((exp) =>
          exp.id === action.payload.id ? action.payload : exp
        );
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.expenses = state.expenses.filter(
          (exp) => exp.id !== action.payload.id
        );
      });
  },
});
