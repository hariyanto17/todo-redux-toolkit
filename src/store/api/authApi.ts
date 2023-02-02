import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/user/",
    prepareHeaders: (headers) =>
      headers.set("Access-Control-Allow-Origin", "*"),
  }),
  tagTypes: ["auth"],
  endpoints: (builder) => ({
    register: builder.mutation({
      query(payload) {
        return {
          url: `register`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: [{ type: "auth", id: "REGISTER" }],
    }),
    login: builder.mutation({
      query(payload) {
        return {
          url: `login`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: [{ type: "auth", id: "LOGIN" }],
    }),
  }),
});
