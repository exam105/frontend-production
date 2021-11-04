import { configureStore } from "@reduxjs/toolkit";
// import { papersApi } from "../services/papersApi";
import searchReducer from "../services/searchSlice";
import questionReducer from "../services/questionSlice.js";
import questionsReducer from "../services/questionsSlice";

const store = configureStore({
  reducer: {
    // [papersApi.reducerPath]: papersApi.reducer,
    papers: searchReducer,
    question: questionReducer,
    questions: questionsReducer,
  },
});

export default store;
