import api from "../lib/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  questionsData: [
    {
      id: "",
      question: "",
    },
  ],
  questionsPending: false,
  questionsError: false,
};
export const getQuestions = createAsyncThunk(
  "questions/getQuestions",
  async (id, isTheory) => {
    const response = await api.get(
      isTheory ? `/exam/questions/theory/${id}` : `/exam/questions/${id}`
    );
    return response.data;
  }
);

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    resetQuestions: (state) => {
      state.questionsData = initialState.questionsData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuestions?.pending, (state) => {
        state.questionsPending = true;
        state.questionsError = false;
      })
      .addCase(getQuestions?.fulfilled, (state, action) => {
        state.questionsPending = false;
        state.questionsError = false;
        state.questionsData = action.payload;
      })
      .addCase(getQuestions?.rejected, (state) => {
        state.questionsPending = false;
        state.questionsError = true;
      });
  },
});
export const { resetQuestions } = questionsSlice.actions;
export default questionsSlice.reducer;
