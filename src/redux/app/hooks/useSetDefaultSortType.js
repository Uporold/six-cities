import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ActionCreator } from "../app";

export const useSetDefaultSortType = () => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(ActionCreator.setDefaultSortType());
  }, [dispatch]);
};
