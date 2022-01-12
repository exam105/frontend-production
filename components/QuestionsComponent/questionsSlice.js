import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../config";

const initialState = {
  data: {
    paperData: {
      id: "",
      subject: "",
      system: "",
      board: "",
      series: "",
      paper: "",
      date: "",
      question_hex_ids: [],
    },
    questionsData: [
      {
        id: "",
        question: "",
      },
    ],
  },
  questionsPending: false,
  questionsError: false,
};
export const getQuestions = createAsyncThunk(
  "questions/getQuestions",
  async (id, isTheory) => {
    const questionsRes = await fetch(
      isTheory
        ? `${API}/exam/questions/theory/${id}`
        : `${API}/exam/questions/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const paperRes = await fetch(`${API}/exam/metadata/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const questionsData = await questionsRes.json();
    const paperData = await paperRes.json();
    return {
      questionsData,
      paperData,
    };
  }
);

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    resetQuestions: (state) => {
      state.data.questionsData = initialState.data.questionsData;
      state.data.paperData = initialState.data.paperData;
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
        state.data.questionsData = action.payload.questionsData;
        state.data.paperData = action.payload.paperData;
      })
      .addCase(getQuestions?.rejected, (state) => {
        state.questionsPending = false;
        state.questionsError = true;
      });
  },
});
export const { resetQuestions } = questionsSlice.actions;
export default questionsSlice.reducer;
