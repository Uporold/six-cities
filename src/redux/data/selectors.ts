import { createSelector } from "reselect";
import { getCurrentCity, getCurrentSortType } from "../app/selectors";
import {
  getHotelsByCity,
  getSortedHotels,
  getHotelsCities,
} from "../../utilites/util";
import { GlobalState } from "../reducer";

export const getHotels = (state: GlobalState) => state.DATA.hotels;
export const getFavoriteHotels = (state: GlobalState) =>
  state.DATA.favoriteHotels;
export const getHotelReviews = (state: GlobalState) => state.DATA.hotelReviews;
export const getNearbyHotels = (state: GlobalState) => state.DATA.nearbyHotels;
export const getLoadingStatus = (state: GlobalState) =>
  state.DATA.isDataLoading;
export const getFavoritesLoadingStatus = (state: GlobalState) =>
  state.DATA.isFavoritesLoading;
export const getSendingErrorStatus = (state: GlobalState) =>
  state.DATA.isSendingError;
export const getReviewSendingStatus = (state: GlobalState) =>
  state.DATA.isReviewSending;
export const getErrorHotelIds = (state: GlobalState) =>
  state.DATA.errorHotelIds;
export const getErrorMessage = (state: GlobalState) => state.DATA.errorMessage;

export const getHotelsSortedByCity = createSelector(
  getHotels,
  getCurrentCity,
  (hotels, currentCity) => getHotelsByCity(hotels, currentCity),
);

export const getCitiesOfFavoriteHotels = createSelector(
  getFavoriteHotels,
  (hotels) => getHotelsCities(hotels),
);

export const getHotelsSortedByForm = createSelector(
  getHotelsSortedByCity,
  getCurrentSortType,
  (hotels, currentSortType) =>
    getSortedHotels(hotels, currentSortType).length > 1
      ? getSortedHotels(hotels, currentSortType)
      : hotels,
);

export const getCurrentHotel = (id: number) =>
  createSelector(getHotels, (hotels) =>
    hotels.find((hotel) => hotel.id === Number(id)),
  );
