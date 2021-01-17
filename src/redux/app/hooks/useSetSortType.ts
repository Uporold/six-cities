import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ActionCreator } from "../app";
import { Sort } from "../../../utilites/types";

export const useSetSortType = (): ((sortType: Sort) => void) => {
  const dispatch = useDispatch();

  return useCallback(
    (sortType) => {
      dispatch(ActionCreator.setSort(sortType));
    },
    [dispatch],
  );
};
