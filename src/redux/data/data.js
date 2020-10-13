import { hotels } from "../../mock/offers";
import { reviews } from "../../mock/reviews";
import { getHotelReviews } from "../../utilites/util";

export const initialState = {
  hotels,
  hotelReviews: [],
};

export const ActionType = {
  LOAD_HOTELS: `LOAD_HOTELS`,
  GET_HOTEL_REVIEWS: `GET_HOTEL_REVIEWS`,
};

export const ActionCreator = {
  loadHotels: () => {
    return {
      type: ActionType.LOAD_HOTELS,
      payload: hotels,
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
    case ActionType.LOAD_HOTELS:
      return { ...state, hotelsByCity: action.payload };
    case ActionType.GET_HOTEL_REVIEWS:
      return { ...state, hotelReviews: action.payload };
    default:
      return state;
  }
};
