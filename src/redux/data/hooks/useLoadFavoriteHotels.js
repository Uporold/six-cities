import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Operation } from "../data";

export const useLoadFavoriteHotels = () => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(Operation.loadFavoriteHotels());
  }, [dispatch]);
};
