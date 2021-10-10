import { configureStore, Action, ThunkAction } from "@reduxjs/toolkit";
// import { papersApi } from "@/services/papersApi";
import searchReducer from "@/services/searchSlice";

const store = configureStore({
  reducer: {
    // [papersApi.reducerPath]: papersApi.reducer,
    searchPapers: searchReducer,
  },
});

export default store;
// const AppDispatch = store.dispatch;
// const RootState = store.getState;
// export { store, AppDispatch, RootState };
