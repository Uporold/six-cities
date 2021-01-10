import { useSelector } from "react-redux";
import { UserLogged } from "../../../utilites/types";
import {
  getAuthorizationStatus,
  getAuthorizationLoadingStatus,
  getUser,
} from "../selectors";

export const useAuthorizationStatus = (): boolean => {
  return useSelector(getAuthorizationStatus);
};

export const useAuthorizationLoadingStatus = (): boolean => {
  return useSelector(getAuthorizationLoadingStatus);
};

export const useUser = (): UserLogged => {
  return useSelector(getUser);
};
