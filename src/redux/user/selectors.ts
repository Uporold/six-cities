import { GlobalState } from "../reducer";

export const getAuthorizationStatus = (state: GlobalState) => {
  return state.USER.authorizationStatus;
};

export const getUser = (state: GlobalState) => {
  return state.USER.user;
};

export const getAuthorizationLoadingStatus = (state: GlobalState) => {
  return state.USER.isAuthorizationLoading;
};
