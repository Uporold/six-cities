import { createSelector } from "reselect";
import NameSpace from "../name-space";
import { getCurrentCity, getCurrentSortType } from "../app/selectors";
import {
  getHotelsByCity,
  getSortedHotels,
  getHotelsCities,
} from "../../utilites/util";

export const getHotels = (state) => state[NameSpace.DATA].hotels;
export const getFavoriteHotels = (state) =>
  state[NameSpace.DATA].favoriteHotels;
export const getHotelReviews = (state) => state[NameSpace.DATA].hotelReviews;
export const getNearbyHotels = (state) => state[NameSpace.DATA].nearbyHotels;
export const getLoadingStatus = (state) => state[NameSpace.DATA].isDataLoading;

export const getHotelsSortedByCity = createSelector(
  getHotels,
  getCurrentCity,
  (hotels, currentCity) => getHotelsByCity(hotels, currentCity)
);

export const getCitiesOfFavoriteHotels = createSelector(
  getFavoriteHotels,
  (hotels) => getHotelsCities(hotels)
);

export const getHotelsSortedByForm = createSelector(
  getHotelsSortedByCity,
  getCurrentSortType,
  (hotels, currentSortType) =>
    getSortedHotels(hotels, currentSortType).length > 1
      ? getSortedHotels(hotels, currentSortType)
      : hotels
);

export const getCurrentHotel = (id) =>
  createSelector(getHotels, (hotels) =>
    hotels.find((hotel) => hotel.id === Number(id))
  );
