import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { authApi } from "./api/authApi";
import { todoApi } from "./api/todoApi";
import userSlice from "./slice/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    [authApi.reducerPath]: authApi.reducer,
    [todoApi.reducerPath]: todoApi.reducer,
  },
  middleware: (defaultMiddlewate) =>
    defaultMiddlewate().concat(todoApi.middleware, authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { store, authApi, todoApi };
