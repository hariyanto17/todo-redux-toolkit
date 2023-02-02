import { BaseQueryApi } from "@reduxjs/toolkit/dist/query";
import { MaybePromise } from "@reduxjs/toolkit/dist/query/tsHelpers";
import { RootState } from "..";

type PickType = "getState" | "extra" | "endpoint" | "type" | "forced";

export const prepareHeaders = (
  headers: Headers,
  { getState }: Pick<BaseQueryApi, PickType>
): MaybePromise<void | Headers> => {
  const { user } = getState() as RootState;
  headers.set("Access-Control-Allow-Origin", "*");
  if (user.isLogin) {
    headers.set("Authorization", `Bearer ${user.token}`);
  }
  return headers;
};
