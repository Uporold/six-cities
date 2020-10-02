import { reviews } from "../mock/reviews";
import { hotels } from "../mock/offers";
import { getHotelsByCity, getHotelReviews } from "../utilites/util";

const DEFAULT_CITY = `Amsterdam`;
const DEFAULT_SORT = `Popular`;

export const initialState = {
  hotels,
  hotelReviews: [],
  hotelsByCity: getHotelsByCity(hotels, DEFAULT_CITY),
  currentCity: DEFAULT_CITY,
  currentSortType: DEFAULT_SORT,
  isSortOpen: false,
};

export const ActionType = {
  GET_HOTELS_BY_CITY: `GET_HOTELS_BY_CITY`,
  SET_CITY: `SET_CITY`,
  GET_HOTEL_REVIEWS: `GET_HOTEL_REVIEWS`,
  SET_SORT_TYPE: `SET_SORT_TYPE`,
  SET_DEFAULT_SORT_TYPE: `SET_DEFAULT_SORT_TYPE`,
  SET_SORT_FORM_STATUS: `SET_SORT_FORM_STATUS`,
};

export const ActionCreator = {
  getHotels: (city) => {
    const hotelsByCity = getHotelsByCity(hotels, city);
    return {
      type: ActionType.GET_HOTELS_BY_CITY,
      payload: hotelsByCity,
    };
  },

  setCity: (city) => {
    return {
      type: ActionType.SET_CITY,
      payload: city,
    };
  },

  getHotelReviews: (hotel) => {
    const hotelReviews = getHotelReviews(hotel, reviews);
    return {
      type: ActionType.GET_HOTEL_REVIEWS,
      payload: hotelReviews,
    };
  },

  setSort: (sortType) => {
    return {
      type: ActionType.SET_SORT_TYPE,
      payload: sortType,
    };
  },

  setSortFormStatus: () => {
    return {
      type: ActionType.SET_SORT_FORM_STATUS,
    };
  },

  setDefaultSortType: () => {
    return {
      type: ActionType.SET_DEFAULT_SORT_TYPE,
      payload: DEFAULT_SORT,
    };
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_HOTELS_BY_CITY:
      return { ...state, hotelsByCity: action.payload };
    case ActionType.SET_CITY:
      return { ...state, currentCity: action.payload };
    case ActionType.GET_HOTEL_REVIEWS:
      return { ...state, hotelReviews: action.payload };
    case ActionType.SET_SORT_TYPE:
      return { ...state, currentSortType: action.payload };
    case ActionType.SET_DEFAULT_SORT_TYPE:
      return { ...state, currentSortType: action.payload, isSortOpen: false };
    case ActionType.SET_SORT_FORM_STATUS:
      return { ...state, isSortOpen: !state.isSortOpen };
    default:
      return state;
  }
};
