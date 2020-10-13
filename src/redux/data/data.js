import { hotelAdapter, reviewAdapter } from "../adapter/adapter";

export const initialState = {
  hotels: [],
  hotelReviews: [],
};

export const ActionType = {
  LOAD_HOTELS: `LOAD_HOTELS`,
  LOAD_HOTEL_REVIEWS: `LOAD_HOTEL_REVIEWS`,
};

export const ActionCreator = {
  loadHotels: (data) => {
    return {
      type: ActionType.LOAD_HOTELS,
      payload: data,
    };
  },

  loadHotelReviews: (data) => {
    return {
      type: ActionType.LOAD_HOTEL_REVIEWS,
      payload: data,
    };
  },
};

export const Operation = {
  loadHotels: () => (dispatch, getState, api) => {
    return api.get(`/hotels`).then((response) => {
      const loadedHotels = response.data.map((hotel) => hotelAdapter(hotel));
      dispatch(ActionCreator.loadHotels(loadedHotels));
    });
  },

  loadHotelReviews: (hotelId) => (dispatch, getState, api) => {
    return api.get(`/comments/${hotelId}`).then((response) => {
      const loadedComments = response.data.map((comment) =>
        reviewAdapter(comment)
      );
      dispatch(ActionCreator.loadHotelReviews(loadedComments));
    });
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_HOTELS:
      return { ...state, hotels: action.payload };
    case ActionType.LOAD_HOTEL_REVIEWS:
      return { ...state, hotelReviews: action.payload };
    default:
      return state;
  }
};
