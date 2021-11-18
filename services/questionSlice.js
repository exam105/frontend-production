import api from "../lib/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: {
    id: "",
    question: "",
    marks: "",
    answer: "",
    options: [],
    topics: [],
    images: [],
  },
  pending: false,
  error: false,
};
export const getQuestion = createAsyncThunk(
  "question/getQuestion",
  async (id) => {
    const response = await api.get(`/exam/question/${id}`);
    return response.data;
  }
);

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    resetQuestion: (state) => {
      state.data = initialState.data;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuestion?.pending, (state) => {
        state.pending = true;
        state.error = false;
      })
      .addCase(getQuestion?.fulfilled, (state, action) => {
        state.pending = false;
        state.error = false;
        state.data = action.payload;
      })
      .addCase(getQuestion?.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  },
});
export const { resetQuestion } = questionSlice.actions;
export default questionSlice.reducer;
