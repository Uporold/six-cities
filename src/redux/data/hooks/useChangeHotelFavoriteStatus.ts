import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Operation } from "../data";

export const useChangeHotelFavoriteStatus = (): ((
  hotelId: number,
  isFavorite: boolean,
) => void) => {
  const dispatch = useDispatch();

  return useCallback(
    (hotelId, isFavorite) => {
      dispatch(Operation.changeHotelFavoriteStatus(hotelId, isFavorite));
    },
    [dispatch],
  );
};
