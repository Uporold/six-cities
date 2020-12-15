import { useSelector } from "react-redux";
import {
  getCitiesOfFavoriteHotels,
  getCurrentHotel,
  getErrorHotelIds,
  getErrorMessage,
  getFavoriteHotels,
  getFavoritesLoadingStatus,
  getHotelReviews,
  getHotels,
  getHotelsSortedByCity,
  getHotelsSortedByForm,
  getLoadingStatus,
  getNearbyHotels,
  getReviewSendingStatus,
  getSendingErrorStatus,
} from "../selectors";

export const useHotels = () => {
  return useSelector(getHotels);
};

export const useFavoriteHotels = () => {
  return useSelector(getFavoriteHotels);
};

export const useHotelReviews = () => {
  return useSelector(getHotelReviews);
};

export const useNearbyHotels = () => {
  return useSelector(getNearbyHotels);
};

export const useLoadingStatus = () => {
  return useSelector(getLoadingStatus);
};

export const useFavoritesLoadingStatus = () => {
  return useSelector(getFavoritesLoadingStatus);
};

export const useSendingErrorStatus = () => {
  return useSelector(getSendingErrorStatus);
};

export const useReviewSendingStatus = () => {
  return useSelector(getReviewSendingStatus);
};

export const useErrorHotelIds = () => {
  return useSelector(getErrorHotelIds);
};

export const useErrorMessage = () => {
  return useSelector(getErrorMessage);
};

export const useHotelsSortedByCity = () => {
  return useSelector(getHotelsSortedByCity);
};

export const useCitiesOfFavoriteHotels = () => {
  return useSelector(getCitiesOfFavoriteHotels);
};

export const useHotelsSortedByForm = () => {
  return useSelector(getHotelsSortedByForm);
};

export const useCurrentHotel = (id) => {
  return useSelector(getCurrentHotel(id));
};
