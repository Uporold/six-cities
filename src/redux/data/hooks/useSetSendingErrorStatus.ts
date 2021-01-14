import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ActionCreator } from "../data";

export const useSetSendingErrorStatus = (): ((status: boolean) => void) => {
  const dispatch = useDispatch();

  return useCallback(
    (status) => {
      dispatch(ActionCreator.setSendingErrorStatus(status));
    },
    [dispatch],
  );
};
