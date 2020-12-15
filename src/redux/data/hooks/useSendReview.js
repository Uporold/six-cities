import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Operation } from "../data";

export const useSendReview = () => {
  const dispatch = useDispatch();

  return useCallback(
    (hotelId, review) => {
      dispatch(Operation.sendReview(hotelId, review));
    },
    [dispatch]
  );
};
