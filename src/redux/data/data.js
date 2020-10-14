import { hotelAdapter, reviewAdapter } from "../adapter/adapter";

export const initialState = {
  hotels: [],
  hotelReviews: [],
  nearbyHotels: [],
};

export const ActionType = {
  LOAD_HOTELS: `LOAD_HOTELS`,
  LOAD_HOTEL_REVIEWS: `LOAD_HOTEL_REVIEWS`,
  LOAD_NEARBY_HOTELS: `LOAD_NEARBY_HOTELS`,
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

  loadNearbyHotels: (data) => {
    return {
      type: ActionType.LOAD_NEARBY_HOTELS,
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

  loadNearbyHotels: (hotelId) => (dispatch, getState, api) => {
    return api.get(`/hotels/${hotelId}/nearby`).then((response) => {
      const loadedNearbyHotels = response.data.map((nearbyHotel) =>
        hotelAdapter(nearbyHotel)
      );
      dispatch(ActionCreator.loadNearbyHotels(loadedNearbyHotels));
    });
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_HOTELS:
      return { ...state, hotels: action.payload };
    case ActionType.LOAD_HOTEL_REVIEWS:
      return { ...state, hotelReviews: action.payload };
    case ActionType.LOAD_NEARBY_HOTELS:
      return { ...state, nearbyHotels: action.payload };
    default:
      return state;
  }
};
