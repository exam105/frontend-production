import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { RootState } from "@/app/store";
import axios from "axios";
import { API_URL } from "../config";

const user = {
  subject: "Math",
  system: "IGCSE",
  board: "Edexcel",
  from_date: "2010-02-01T00:00:00.000Z",
  to_date: "2022-02-01T00:00:00.000Z",
};
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
export const getSearchPapers = () =>
  createAsyncThunk("papers/getSearchPapers", async (dispatch, getState) => {
    console.log("execution came here");
    const response = await axios({
      method: "post",
      url: `${API_URL}/dashboard/de/search/daterange`,
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(user),
    });
    // post(
    //   `${API_URL}/dashboard/de/search${param ? param : "/date"}`
    // );
    return response.data;
  });

const searchSlice = createSlice({
  name: "search",
  initialState,
  //   reducers: {},
  extraReducers: {
    [getSearchPapers.pending]: (state, action) => {
      state.pending = true;
    },
    [getSearchPapers.fulfilled]: (state, action) => {
      state.pending = false;
      state.data = action.payload;
    },
    [getSearchPapers.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    },
    //   (builder) => {
    // builder
    //   .addCase(getSearchPapers.pending, (state) => {
    //     state.pending = true;
    //   })
    //   .addCase(getSearchPapers.fulfilled, (state, action) => {
    //     state.pending = false;
    //     state.data = action.payload;
    //   })
    //   .addCase(getSearchPapers.rejected, (state) => {
    //     state.pending = false;
    //     state.error = true;
    //   });
  },
});
// export const selectSearch = RootState.searchPapers;
export default searchSlice.reducer;
