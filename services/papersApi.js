// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const user = {
//   subject: "Math",
//   system: "IGCSE",
//   board: "Edexcel",
//   from_date: "2010-02-01T00:00:00.000Z",
//   to_date: "2022-02-01T00:00:00.000Z",
// };

// const papersApiHeaders = {
//   // "Content-Type": "application/json"
// };

// const baseUrl = "http://exam105.com:9090";

// const createRequest = (url) => ({
//   url,
//   headers: papersApiHeaders,
//   //   method: "POST",
//   //   body: JSON.stringify(user),
// });

// export const papersApi = createApi({
//   reducerPath: "papersApi",
//   baseQuery: fetchBaseQuery({ baseUrl }),
//   endpoints: (builder) => ({
//     getPapers: builder.query({
//       query: () => createRequest("/exam/question/611584b04df2b34eb506835e"),
//     }),
//   }),
// });
// export const { useGetPapersQuery } = papersApi;
