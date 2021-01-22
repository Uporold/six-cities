import { Action, combineReducers } from "redux";
import { ThunkAction } from "redux-thunk";
import { AxiosInstance } from "axios";
import { reducer as data } from "./data/data";
import { reducer as app } from "./app/app";
import { reducer as user } from "./user/user";
import NameSpace from "./name-space";

export const rootReducer = combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.APP]: app,
  [NameSpace.USER]: user,
});

export type GlobalState = ReturnType<typeof rootReducer>;

export type InferActionsTypes<T> = T extends { [key: string]: infer U }
  ? U
  : never;

export type BaseThunkActionType<A extends Action = Action> = ThunkAction<
  void,
  GlobalState,
  AxiosInstance,
  A
>;
