import api from "../lib/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: [
    {
      id: "",
      question: "",
      marks: "",
      options: [],
      topics: [],
      images: [],
    },
  ],
  pending: false,
  error: false,
};
export const getMcqQuestion = createAsyncThunk(
  "questions/getMcqQuestion",
  async (id) => {
    const response = await api.post(`/dashboard/de/question/${id}`);
    return response.data;
  }
);

const mcqQuestionSlice = createSlice({
  name: "mcq",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMcqQuestion?.pending, (state) => {
        state.pending = true;
      })
      .addCase(getMcqQuestion?.fulfilled, (state, action) => {
        state.pending = false;
        state.data = action.payload;
      })
      .addCase(getMcqQuestion?.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  },
});
export default mcqQuestionSlice.reducer;
