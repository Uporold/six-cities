import { hotelAdapter, reviewAdapter } from "../adapter/adapter";

export const initialState = {
  hotels: [],
  favoriteHotels: [],
  hotelReviews: [],
  nearbyHotels: [],
  isDataLoading: true,
  isFavoritesLoading: true,
};

export const ActionType = {
  LOAD_HOTELS: `LOAD_HOTELS`,
  LOAD_FAVORITE_HOTELS: `LOAD_FAVORITE_HOTELS`,
  LOAD_HOTEL_REVIEWS: `LOAD_HOTEL_REVIEWS`,
  LOAD_NEARBY_HOTELS: `LOAD_NEARBY_HOTELS`,
  FINISH_LOADING: `FINISH_LOADING`,
  FINISH_FAVORITES_LOADING: `FINISH_FAVORITES_LOADING`,
  UPDATE_FAVORITE_STATUS: `UPDATE_FAVORITE_STATUS`,
};

export const ActionCreator = {
  loadHotels: (data) => {
    return {
      type: ActionType.LOAD_HOTELS,
      payload: data,
    };
  },

  loadFavoriteHotels: (data) => {
    return {
      type: ActionType.LOAD_FAVORITE_HOTELS,
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

  finishLoading: () => {
    return {
      type: ActionType.FINISH_LOADING,
      payload: false,
    };
  },

  finishFavoritesLoading: () => {
    return {
      type: ActionType.FINISH_FAVORITES_LOADING,
      payload: false,
    };
  },

  updateFavoriteStatus: (hotel) => {
    return {
      type: ActionType.UPDATE_FAVORITE_STATUS,
      payload: hotel,
    };
  },
};

export const Operation = {
  loadHotels: () => (dispatch, getState, api) => {
    return api.get(`/hotels`).then((response) => {
      const loadedHotels = response.data.map((hotel) => hotelAdapter(hotel));
      dispatch(ActionCreator.loadHotels(loadedHotels));
      dispatch(ActionCreator.finishLoading());
    });
  },

  loadFavoriteHotels: () => (dispatch, getState, api) => {
    return api.get(`/favorite`).then((response) => {
      const loadedHotels = response.data.map((hotel) => hotelAdapter(hotel));
      dispatch(ActionCreator.loadFavoriteHotels(loadedHotels));
      dispatch(ActionCreator.finishFavoritesLoading());
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

  sendReview: (hotelId, review) => (dispatch, getState, api) => {
    return api
      .post(`/comments/${hotelId}`, {
        comment: review.comment,
        rating: review.rating,
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch(Operation.loadHotelReviews(hotelId));
        }
      });
  },

  changeHotelFavoriteStatus: (hotelId, isFavorite) => (
    dispatch,
    getState,
    api
  ) => {
    return api
      .post(`/favorite/${hotelId}/${isFavorite ? 1 : 0}`)
      .then((response) => {
        dispatch(
          ActionCreator.updateFavoriteStatus(hotelAdapter(response.data))
        );
      });
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_HOTELS:
      return { ...state, hotels: action.payload };
    case ActionType.LOAD_FAVORITE_HOTELS:
      return { ...state, favoriteHotels: action.payload };
    case ActionType.LOAD_HOTEL_REVIEWS:
      return { ...state, hotelReviews: action.payload };
    case ActionType.LOAD_NEARBY_HOTELS:
      return { ...state, nearbyHotels: action.payload };
    case ActionType.FINISH_LOADING:
      return { ...state, isDataLoading: action.payload };
    case ActionType.FINISH_FAVORITES_LOADING:
      return { ...state, isFavoritesLoading: action.payload };
    case ActionType.UPDATE_FAVORITE_STATUS: {
      const favoriteIndex = state.hotels.findIndex(
        (item) => item.id === action.payload.id
      );
      return {
        ...state,
        hotels: [].concat(
          ...state.hotels.slice(0, favoriteIndex),
          action.payload,
          ...state.hotels.slice(favoriteIndex + 1, state.hotels.length)
        ),
        favoriteHotels: state.favoriteHotels.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    }
    default:
      return state;
  }
};