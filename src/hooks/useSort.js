import { useEffect, useState } from "react";
import { useCurrentSortType } from "../redux/app/hooks/selectors";
import { useSetSortType } from "../redux/app/hooks/useSetSortType";
import { usePrevious } from "../utilites/util";

export const useSort = (currentCity) => {
  const [isSortOpen, setSortFormOpenStatus] = useState(false);
  const currentSortType = useCurrentSortType();
  const setSortType = useSetSortType();
  const previousCity = usePrevious(currentCity);

  useEffect(() => {
    if (previousCity && previousCity !== currentCity) {
      setSortFormOpenStatus(false);
    }
  }, [currentCity, previousCity]);

  return { isSortOpen, setSortFormOpenStatus, currentSortType, setSortType };
};
