import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ActionCreator } from "../app";

export const useSetCity = (): ((city: string) => void) => {
  const dispatch = useDispatch();

  return useCallback(
    (city) => {
      dispatch(ActionCreator.setCity(city));
    },
    [dispatch],
  );
};
