import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";

export interface CounterState {
  isLogin: boolean;
  token: string;
  refreshToken: string;
}

const initialState: CounterState = {
  isLogin: false,
  token: "",
  refreshToken: "",
};

interface loginPayload {
  status: "success" | "error";
  data: { token: string; refreshToken: string };
}

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setIsLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action: PayloadAction<loginPayload>) => {
        if (action.payload.status === "success") {
          const { token, refreshToken } = action.payload.data;
          state.token = token;
          state.refreshToken = refreshToken;
          state.isLogin = true;
        }
      }
    );
  },
});

export default userSlice.reducer;
