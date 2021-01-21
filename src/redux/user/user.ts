import { AxiosInstance, AxiosPromise } from "axios";
import { Dispatch } from "redux";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import history from "../../history";
import { createUser } from "../adapter/adapter";
import { LoginData, UserLogged } from "../../utilites/types";
import { GlobalState } from "../reducer";

interface UserActionInterface {
  type: string;
  payload: boolean | UserLogged;
}

export interface InitialStateInterface {
  authorizationStatus: boolean;
  user: UserLogged;
  isAuthorizationLoading: boolean;
}

export const initialState: InitialStateInterface = {
  authorizationStatus: false,
  user: {
    id: -1,
    email: ``,
    isPro: false,
    avatar: ``,
    name: ``,
  },
  isAuthorizationLoading: true,
};

export const ActionType = {
  SET_AUTHORIZATION_STATUS: `SET_AUTHORIZATION_STATUS`,
  GET_USER_DATA: `GET_USER_DATA`,
  FINISH_AUTHORIZATION: `FINISH_AUTHORIZATION`,
};

export const ActionCreator = {
  finishAuthorizationLoading: (): UserActionInterface => {
    return {
      type: ActionType.FINISH_AUTHORIZATION,
      payload: false,
    };
  },

  setAuthorizationStatus: (status: boolean): UserActionInterface => {
    return {
      type: ActionType.SET_AUTHORIZATION_STATUS,
      payload: status,
    };
  },

  getUserData: (userData: UserLogged): UserActionInterface => {
    return {
      type: ActionType.GET_USER_DATA,
      payload: userData,
    };
  },
};

export const reducer = (
  state = initialState,
  action: UserActionInterface,
): InitialStateInterface => {
  switch (action.type) {
    case ActionType.SET_AUTHORIZATION_STATUS:
      return { ...state, authorizationStatus: action.payload as boolean };
    case ActionType.GET_USER_DATA:
      return { ...state, user: action.payload as UserLogged };
    case ActionType.FINISH_AUTHORIZATION:
      return { ...state, isAuthorizationLoading: action.payload as boolean };
    default:
      return state;
  }
};

export const Operation = {
  checkAuth: (): ThunkAction<
    void,
    GlobalState,
    AxiosInstance,
    UserActionInterface
  > => async (
    dispatch: ThunkDispatch<GlobalState, AxiosInstance, UserActionInterface>,
    getState: () => GlobalState,
    api: { get: (arg0: string) => AxiosPromise },
  ): Promise<void> => {
    try {
      const response = await api.get(`/login`);
      dispatch(ActionCreator.setAuthorizationStatus(true));
      dispatch(ActionCreator.getUserData(createUser(response.data)));
      dispatch(ActionCreator.finishAuthorizationLoading());
    } catch (e) {
      dispatch(ActionCreator.setAuthorizationStatus(false));
      dispatch(ActionCreator.finishAuthorizationLoading());
    }
  },

  login: (
    authData: LoginData,
  ): ThunkAction<
    void,
    GlobalState,
    AxiosInstance,
    UserActionInterface
  > => async (
    dispatch: ThunkDispatch<GlobalState, AxiosInstance, UserActionInterface>,
    getState: () => GlobalState,
    api: {
      post: (
        arg0: string,
        arg1: { email: string; password: string },
      ) => AxiosPromise;
    },
  ): Promise<void> => {
    const response = await api.post(`/login`, {
      email: authData.email,
      password: authData.password,
    });
    dispatch(ActionCreator.setAuthorizationStatus(true));
    dispatch(ActionCreator.getUserData(createUser(response.data)));
    history.push(`/`);
  },
};
