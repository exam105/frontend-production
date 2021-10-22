import api from "../lib/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: [
    {
      id: "",
      question: "",
      marks: "",
      answer: "",
      topics: [],
      images: [],
    },
  ],
  pending: false,
  error: false,
};
export const getTheoryQuestion = createAsyncThunk(
  "questions/getTheoryQuestion",
  async (id) => {
    const response = await api.post(`/dashboard/de/question/theory/${id}`);
    return response.data;
  }
);

const theoryQuestionSlice = createSlice({
  name: "theory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTheoryQuestion?.pending, (state) => {
        state.pending = true;
      })
      .addCase(getTheoryQuestion?.fulfilled, (state, action) => {
        state.pending = false;
        state.data = action.payload;
      })
      .addCase(getTheoryQuestion?.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  },
});
export default theoryQuestionSlice.reducer;
