import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ActionCreator } from "../data";

export const useClearErrorIds = () => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(ActionCreator.clearErrorHotelIds());
  }, [dispatch]);
};
