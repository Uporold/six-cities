import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Operation } from "../data";

export const useLoadHotelReviews = (): ((hotelId: number) => void) => {
  const dispatch = useDispatch();

  return useCallback(
    (hotelId) => {
      dispatch(Operation.loadHotelReviews(hotelId));
    },
    [dispatch],
  );
};
