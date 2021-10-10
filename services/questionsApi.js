import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const questionsApiHeaders = {
  "Content-Type": "application/json",
};

const baseUrl = "http://exam105.com:9090";

const createRequest = (url) => ({
  url,
  headers: questionsApiHeaders,
});

export const questionsApi = createApi({
  reducerPath: "questionsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getPapers: builder.query({
      query: () => createRequest("/exam/question/611584b04df2b34eb506835e"),
    }),
  }),
});
export const { useGetQuestionsQuery } = questionsApi;
