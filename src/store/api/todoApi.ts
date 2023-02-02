import { ResultDescription } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";
import { Todo, TodoData } from "../../utils";
import { prepareHeaders } from "./prepareHeaders";

const invalidatesTags: ResultDescription<
  "Todos",
  TodoData,
  TodoData,
  FetchBaseQueryError,
  FetchBaseQueryMeta | undefined
> = [{ type: "Todos", id: "LIST" }];

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/",
    prepareHeaders,
  }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getAll: builder.query<Todo, void>({
      query: () => `todos`,
      providesTags: invalidatesTags,
    }),
    addTodo: builder.mutation<string, string>({
      query(title) {
        return {
          url: `todos`,
          method: "POST",
          body: {
            title,
          },
        };
      },
      invalidatesTags,
    }),
    updateTodo: builder.mutation<TodoData, TodoData>({
      query(todo) {
        return {
          url: `todos/${todo.uuid}`,
          method: "PUT",
          body: todo,
        };
      },
      invalidatesTags,
    }),
    deleteTodo: builder.mutation<TodoData, TodoData>({
      query(todo) {
        return {
          url: `todos/${todo.uuid}`,
          method: "DELETE",
          body: todo,
        };
      },
      invalidatesTags,
    }),
  }),
});
