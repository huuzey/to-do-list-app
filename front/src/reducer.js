import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "./App";

const initialState = {
  lists: [],
  status: "idle",
  loading: false,
};

export const getLists = createAsyncThunk("/todo", async () => {
  try {
    const data = await axios.get(`${BASE_URL}/get`);
    console.log("successfully fetched");
    return data.data;
  } catch (error) {
    console.log(error);
  }
});
const todo = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addList: (state, action) => {
      state.lists = state.lists.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLists.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLists.fulfilled, (state, action) => {
        state.loading = false;
        state.lists = action.payload;
      })
      .addCase(getLists.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default todo.reducer;
export const {} = todo.actions;
