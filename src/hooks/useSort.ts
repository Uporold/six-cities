import { useEffect, useState } from "react";
import { useCurrentSortType } from "../redux/app/hooks/selectors";
import { useSetSortType } from "../redux/app/hooks/useSetSortType";
import { usePrevious } from "../utilites/util";

interface UseSortReturn {
  isSortOpen: boolean;
  setSortFormOpenStatus: (
    value: ((prevState: boolean) => boolean) | boolean,
  ) => void;
  currentSortType: string;
  setSortType: (sortType: string) => void;
}

export const useSort = (currentCity: string): UseSortReturn => {
  const [isSortOpen, setSortFormOpenStatus] = useState<boolean>(false);
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
