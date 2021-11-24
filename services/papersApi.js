// import { API_URL } from "../config";
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const papersApiHeaders = {
//   "Content-Type": "application/json",
//   // Authorization:
//   // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ZmFsc2UsImF1dGhvcml6ZWQiOnRydWUsImVtYWlsIjoiam9AZW1haWwuY29tIiwiZXhwIjoxNjM1NjYyOTQ1LCJuYW1lIjoiam8ifQ.1vmRCK3ZpyIVaurMsQy75E0uW7ppmcm3KnRmncZSi2w",
// };

// const baseUrl = API_URL;

// const createRequest = (url) => ({
//   url,
//   headers: papersApiHeaders,
// });

// export const papersApi = createApi({
//   reducerPath: "papersApi",
//   baseQuery: fetchBaseQuery({ baseUrl }),
//   endpoints: (builder) => ({
//     getQuestionsList: builder.query({
//       query: (paperId) => createRequest(`/dashboard/de/questions/${paperId}`),
//     }),
//     getQuestion: builder.query({
//       query: (questionId) => createRequest(`/exam/question/${questionId}`),
//     }),
//   }),
// });
// export const { useGetQuestionQuery, useGetQuestionsListQuery } = papersApi;
