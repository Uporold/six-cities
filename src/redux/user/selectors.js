import NameSpace from "../name-space";

const NAME_SPACE = NameSpace.USER;

export const getAuthorizationStatus = (state) => {
  return state[NAME_SPACE].authorizationStatus;
};

export const getUser = (state) => {
  return state[NAME_SPACE].user;
};

export const getAuthorizationLoadingStatus = (state) => {
  return state[NAME_SPACE].isAuthorizationLoading;
};
