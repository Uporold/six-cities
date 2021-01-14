import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ActionCreator } from "../app";

export const useGetHoveredHotelId = (): ((hotelId: number) => void) => {
  const dispatch = useDispatch();

  return useCallback(
    (hotelId) => {
      dispatch(ActionCreator.getHoveredHotelId(hotelId));
    },
    [dispatch],
  );
};
