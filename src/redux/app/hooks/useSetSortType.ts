import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ActionCreator } from "../app";

export const useSetSortType = (): ((sortType: string) => void) => {
  const dispatch = useDispatch();

  return useCallback(
    (sortType) => {
      dispatch(ActionCreator.setSort(sortType));
    },
    [dispatch],
  );
};
