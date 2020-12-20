import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ActionCreator } from "../data";

export const useRemoveErrorHotelId = () => {
  const dispatch = useDispatch();

  return useCallback(
    (hotelId) => {
      dispatch(ActionCreator.removeErrorHotelId(hotelId));
    },
    [dispatch]
  );
};
