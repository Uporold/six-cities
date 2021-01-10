import { useSelector } from "react-redux";
import {
  getCurrentCity,
  getCurrentSortType,
  getHoveredHotelId,
} from "../selectors";

export const useCurrentCity = (): string => {
  return useSelector(getCurrentCity);
};

export const useCurrentSortType = (): string => {
  return useSelector(getCurrentSortType);
};

export const useHoveredHotelId = (): number => {
  return useSelector(getHoveredHotelId);
};
