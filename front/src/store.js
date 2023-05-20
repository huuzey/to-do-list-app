import { configureStore } from "@reduxjs/toolkit";
import listReducer from "./reducer";

export const store = configureStore({
  reducer: {
    list: listReducer,
  },
});
