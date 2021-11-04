import api from "../lib/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: [
    {
      id: "",
      question: "",
    },
  ],
  pending: false,
  error: false,
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

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getQuestions?.pending, (state) => {
        state.pending = true;
        state.error = false;
      })
      .addCase(getQuestions?.fulfilled, (state, action) => {
        state.pending = false;
        state.error = false;
        state.data = action.payload;
      })
      .addCase(getQuestions?.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  },
});
export default questionsSlice.reducer;
