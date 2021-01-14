import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Operation } from "../data";
import { ReviewPure } from "../../../utilites/types";

export const useSendReview = (): ((
  hotelId: number,
  review: ReviewPure,
) => void) => {
  const dispatch = useDispatch();

  return useCallback(
    (hotelId, review) => {
      dispatch(Operation.sendReview(hotelId, review));
    },
    [dispatch],
  );
};
