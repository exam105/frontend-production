import api from "../lib/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: [
    {
      id: "",
      subject: "",
      system: "",
      board: "",
      date: "",
      question_hex_ids: [],
      is_theory: false,
    },
  ],
  pending: false,
  error: false,
};
export const getSearchPapers = createAsyncThunk(
  "papers/getSearchPapers",
  async (paper) => {
    let choice = paper["choice"];
    if (choice === "date") {
      delete paper["choice"];
      delete paper["from_date"];
      delete paper["to_date"];
    } else {
      delete paper["choice"];
      delete paper["date"];
    }
    console.log("execution came here, data: ", paper, "and param: ", choice);
    const response = await api.post(`/dashboard/de/search/${choice}`, paper);
    return response.data;
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSearchPapers?.pending, (state) => {
        state.pending = true;
      })
      .addCase(getSearchPapers?.fulfilled, (state, action) => {
        state.pending = false;
        state.data = action.payload;
      })
      .addCase(getSearchPapers?.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  },
});
// export const selectSearch = RootState.searchPapers;
export default searchSlice.reducer;
