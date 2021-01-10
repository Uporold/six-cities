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
import { Hotel, Review } from "../../../utilites/types";

export const useHotels = (): Array<Hotel> => {
  return useSelector(getHotels);
};

export const useFavoriteHotels = (): Array<Hotel> => {
  return useSelector(getFavoriteHotels);
};

export const useHotelReviews = (): Array<Review> => {
  return useSelector(getHotelReviews);
};

export const useNearbyHotels = (): Array<Hotel> => {
  return useSelector(getNearbyHotels);
};

export const useLoadingStatus = (): boolean => {
  return useSelector(getLoadingStatus);
};

export const useFavoritesLoadingStatus = (): boolean => {
  return useSelector(getFavoritesLoadingStatus);
};

export const useSendingErrorStatus = (): boolean => {
  return useSelector(getSendingErrorStatus);
};

export const useReviewSendingStatus = (): boolean => {
  return useSelector(getReviewSendingStatus);
};

export const useErrorHotelIds = (): Array<number> => {
  return useSelector(getErrorHotelIds);
};

export const useErrorMessage = (): string => {
  return useSelector(getErrorMessage);
};

export const useHotelsSortedByCity = (): Array<Hotel> => {
  return useSelector(getHotelsSortedByCity);
};

export const useCitiesOfFavoriteHotels = (): Array<string> => {
  return useSelector(getCitiesOfFavoriteHotels);
};

export const useHotelsSortedByForm = (): Array<Hotel> => {
  return useSelector(getHotelsSortedByForm);
};

export const useCurrentHotel = (id: string): Hotel => {
  return useSelector(getCurrentHotel(id));
};
