import { Action, combineReducers } from "redux";
import { ThunkAction } from "redux-thunk";
import { AxiosInstance } from "axios";
import { reducer as data, ActionCreator as DataActions } from "./data/data";
import { reducer as app, ActionCreator as AppActions } from "./app/app";
import { reducer as user, ActionCreator as UserActions } from "./user/user";

export const rootReducer = combineReducers({
  DATA: data,
  APP: app,
  USER: user,
});

export type GlobalState = ReturnType<typeof rootReducer>;

const combinedActions = { ...DataActions, ...AppActions, ...UserActions };
export type AllReduxActions = ReturnType<
  InferActionsTypes<typeof combinedActions>
>;

export type InferActionsTypes<T> = T extends { [key: string]: infer U }
  ? U
  : never;

export type BaseThunkActionType<A extends Action = Action> = ThunkAction<
  Promise<void>,
  GlobalState,
  AxiosInstance,
  A
>;
