import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Operation } from "../data";

export const useLoadNearbyHotels = () => {
  const dispatch = useDispatch();

  return useCallback(
    (hotelId) => {
      dispatch(Operation.loadNearbyHotels(hotelId));
    },
    [dispatch]
  );
};
