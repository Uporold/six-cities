import { useSelector } from "react-redux";
import {
  getAuthorizationStatus,
  getAuthorizationLoadingStatus,
  getUser,
} from "../selectors";

export const useAuthorizationStatus = () => {
  return useSelector(getAuthorizationStatus);
};

export const useAuthorizationLoadingStatus = () => {
  return useSelector(getAuthorizationLoadingStatus);
};

export const useUser = () => {
  return useSelector(getUser);
};
