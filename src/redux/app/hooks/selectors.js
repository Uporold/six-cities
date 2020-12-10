import { useSelector } from "react-redux";
import {
  getCurrentCity,
  getCurrentSortType,
  getHoveredHotelId,
} from "../selectors";

export const useCurrentCity = () => {
  return useSelector(getCurrentCity);
};

export const useCurrentSortType = () => {
  return useSelector(getCurrentSortType);
};

export const useHoveredHotelId = () => {
  return useSelector(getHoveredHotelId);
};
