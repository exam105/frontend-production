import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../components/SearchComponent/searchSlice";
import questionReducer from "../components/QuestionsComponent/questionSlice.js";
import questionsReducer from "../components/QuestionsComponent/questionsSlice";

const store = configureStore({
  reducer: {
    papers: searchReducer,
    question: questionReducer,
    questions: questionsReducer,
  },
});

export default store;
