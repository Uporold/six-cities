import { reviews } from "../mock/reviews";
import { hotels } from "../mock/offers";
import { getHotelsByCity, getHotelReviews } from "../utilites/util";

const DEFAULT_CITY = `Amsterdam`;

export const initialState = {
  hotels,
  hotelReviews: [],
  hotelsByCity: getHotelsByCity(hotels, DEFAULT_CITY),
  currentCity: DEFAULT_CITY,
};

export const ActionType = {
  GET_HOTELS_BY_CITY: `GET_HOTELS_BY_CITY`,
  SET_CITY: `SET_CITY`,
  GET_HOTEL_REVIEWS: `GET_HOTEL_REVIEWS`,
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
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_HOTELS_BY_CITY:
      return { ...state, hotelsByCity: action.payload };
    case ActionType.SET_CITY:
      return { ...state, currentCity: action.payload };
    case ActionType.GET_HOTEL_REVIEWS:
      return { ...state, hotelReviews: action.payload };
    default:
      return state;
  }
};
