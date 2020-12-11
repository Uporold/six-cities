import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ActionCreator } from "../app";

export const useSetCity = () => {
  const dispatch = useDispatch();

  return useCallback(
    (city) => {
      dispatch(ActionCreator.setCity(city));
    },
    [dispatch]
  );
};

export const useSetSortType = () => {
  const dispatch = useDispatch();

  return useCallback(
    (sortType) => {
      dispatch(ActionCreator.setSort(sortType));
    },
    [dispatch]
  );
};

