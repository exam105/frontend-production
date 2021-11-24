// import api from "../lib/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../config/";

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
    // delete paper["choice"];
    if (choice === "date") {
      delete paper["choice"];
      delete paper["from_date"];
      delete paper["to_date"];
    } else {
      delete paper["choice"];
      delete paper["date"];
    }

    // const p = {
    //   subject: "Math",
    //   system: "IGCSE",
    //   board: "Edexcel",
    //   from_date: "2010-02-01T00:00:00.000Z",
    //   to_date: "2022-01-01T00:00:00.000Z",
    // };
    // const response = await api.post(`/dashboard/de/search/${choice}`, paper);
    // const res = await fetch(`${API_URL}/a/b/c`, {

    const res = await fetch(`${API}/dashboard/de/search/${choice}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paper),
    });
    const data = await res.json();
    return data;
    // if (res.ok) {
    //   const data = await res.json();
    //   console.log(data);
    //   return data;
    // } else {
    //   return new Error();
    // }
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
        state.error = false;
      })
      .addCase(getSearchPapers?.fulfilled, (state, action) => {
        state.pending = false;
        state.error = false;
        state.data = action.payload;
      })
      .addCase(getSearchPapers?.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  },
});
export default searchSlice.reducer;
