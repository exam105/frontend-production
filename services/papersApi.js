import { API_URL } from "../config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const papersApiHeaders = {
  "Content-Type": "application/json",
};

const baseUrl = API_URL;

const createRequest = (url) => ({
  url,
  headers: papersApiHeaders,
});

export const papersApi = createApi({
  reducerPath: "papersApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getQuestion: builder.query({
      query: (questionId) => createRequest(`/exam/question/${questionId}`),
    }),
  }),
});
export const { useGetQuestionQuery } = papersApi;
