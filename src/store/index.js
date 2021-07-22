import { configureStore } from "@reduxjs/toolkit";
import shoppingSlice from "./slices/shoppingSlice";

const store = configureStore({
  reducer: {
    Shopping: shoppingSlice.reducer,
  }
});

export default store;
