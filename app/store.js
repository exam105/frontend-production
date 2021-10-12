import { configureStore, Action, ThunkAction } from "@reduxjs/toolkit";
// import { papersApi } from "@/services/papersApi";
import searchReducer from "@/services/searchSlice";

const store = configureStore({
  reducer: {
    // [papersApi.reducerPath]: papersApi.reducer,
    papers: searchReducer,
  },
});

export default store;
