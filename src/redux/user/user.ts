import history from "../../history";
import { createUser } from "../adapter/adapter";
import { UserLogged } from "../../utilites/types";

interface UserActionInterface {
  type?: string;
  payload: boolean | UserLogged;
}

interface InitialStateInterface {
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

// TODO operation ts
export const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api
      .get(`/login`)
      .then((response) => {
        dispatch(ActionCreator.setAuthorizationStatus(true));
        dispatch(ActionCreator.getUserData(createUser(response.data)));
        dispatch(ActionCreator.finishAuthorizationLoading());
      })
      .catch(() => {
        dispatch(ActionCreator.setAuthorizationStatus(false));
        dispatch(ActionCreator.finishAuthorizationLoading());
      });
  },

  login: (authData) => (dispatch, getState, api) => {
    return api
      .post(`/login`, {
        email: authData.email,
        password: authData.password,
      })
      .then((response) => {
        dispatch(ActionCreator.setAuthorizationStatus(true));
        dispatch(ActionCreator.getUserData(createUser(response.data)));
        history.push(`/`);
      });
  },
};
