import { createSelector } from "reselect";
import NameSpace from "../name-space";
import { getCurrentCity, getCurrentSortType } from "../app/selectors";
import { getHotelsByCity, getSortedHotels } from "../../utilites/util";

export const getHotels = (state) => state[NameSpace.DATA].hotels;
export const getHotelReviews = (state) => state[NameSpace.DATA].hotelReviews;
export const getNearbyHotels = (state) => state[NameSpace.DATA].nearbyHotels;

export const getHotelsSortedByCity = createSelector(
  getHotels,
  getCurrentCity,
  (hotels, currentCity) => getHotelsByCity(hotels, currentCity)
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
