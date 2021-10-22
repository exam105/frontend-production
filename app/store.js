import { configureStore } from "@reduxjs/toolkit";
// import { papersApi } from "../services/papersApi";
import searchReducer from "../services/searchSlice";
import mcqReducer from "../services/mcqQuestionSlice.js";
import theoryReducer from "../services/theoryQuestionSlice";

const store = configureStore({
  reducer: {
    // [papersApi.reducerPath]: papersApi.reducer,
    papers: searchReducer,
    mcq: mcqReducer,
    theory: theoryReducer,
  },
});

export default store;
