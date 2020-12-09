import { hotelAdapter, reviewAdapter } from "../adapter/adapter";

export const initialState = {
  hotels: [],
  favoriteHotels: [],
  hotelReviews: [],
  nearbyHotels: [],
  isDataLoading: true,
  isFavoritesLoading: true,
  isSendingError: false,
  isReviewSending: false,
  errorMessage: ``,
  errorHotelIds: [],
};

export const ActionType = {
  LOAD_HOTELS: `LOAD_HOTELS`,
  LOAD_FAVORITE_HOTELS: `LOAD_FAVORITE_HOTELS`,
  LOAD_HOTEL_REVIEWS: `LOAD_HOTEL_REVIEWS`,
  LOAD_NEARBY_HOTELS: `LOAD_NEARBY_HOTELS`,
  FINISH_LOADING: `FINISH_LOADING`,
  SET_FAVORITES_LOADING_STATUS: `SET_FAVORITES_LOADING_STATUS`,
  UPDATE_FAVORITE_STATUS: `UPDATE_FAVORITE_STATUS`,
  SET_SENDING_ERROR_STATUS: `SET_SENDING_ERROR_STATUS`,
  SET_REVIEW_SENDING_STATUS: `SET_REVIEW_SENDING_STATUS`,
  SET_ERROR_MESSAGE: `SET_ERROR_MESSAGE`,
  SET_ERROR_HOTEL_ID: `SET_ERROR_HOTEL_ID`,
  REMOVE_FROM_ERROR_HOTEL_ID: `REMOVE_FROM_ERROR_HOTEL_ID`,
  CLEAR_ERROR_HOTEL_IDS: `CLEAR_ERROR_HOTEL_IDS`,
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

  setFavoritesLoadingStatus: (status) => {
    return {
      type: ActionType.SET_FAVORITES_LOADING_STATUS,
      payload: status,
    };
  },

  updateFavoriteStatus: (hotel) => {
    return {
      type: ActionType.UPDATE_FAVORITE_STATUS,
      payload: hotel,
    };
  },

  setSendingErrorStatus: (status) => {
    return {
      type: ActionType.SET_SENDING_ERROR_STATUS,
      payload: status,
    };
  },

  setReviewSendingStatus: (status) => {
    return {
      type: ActionType.SET_REVIEW_SENDING_STATUS,
      payload: status,
    };
  },

  setErrorMessage: (message) => {
    return {
      type: ActionType.SET_ERROR_MESSAGE,
      payload: message,
    };
  },

  setErrorHotelId: (id) => {
    return {
      type: ActionType.SET_ERROR_HOTEL_ID,
      payload: id,
    };
  },

  removeErrorHotelId: (id) => {
    return {
      type: ActionType.REMOVE_FROM_ERROR_HOTEL_ID,
      payload: id,
    };
  },

  clearErrorHotelIds: () => {
    return {
      type: ActionType.CLEAR_ERROR_HOTEL_IDS,
      payload: [],
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
    dispatch(ActionCreator.setFavoritesLoadingStatus(true));
    return api.get(`/favorite`).then((response) => {
      const loadedHotels = response.data.map((hotel) => hotelAdapter(hotel));
      dispatch(ActionCreator.loadFavoriteHotels(loadedHotels));
      dispatch(ActionCreator.setFavoritesLoadingStatus(false));
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
    dispatch(ActionCreator.setReviewSendingStatus(true));
    return api
      .post(`/comments/${hotelId}`, {
        comment: review.comment,
        rating: review.rating,
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch(ActionCreator.setSendingErrorStatus(false));
          dispatch(ActionCreator.setReviewSendingStatus(false));
          dispatch(Operation.loadHotelReviews(hotelId));
        }
      })
      .catch(() => {
        dispatch(ActionCreator.setSendingErrorStatus(true));
        dispatch(ActionCreator.setReviewSendingStatus(false));
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
      })
      .catch((err) => {
        if (err.message !== "Request failed with status code 401") {
          dispatch(ActionCreator.setErrorMessage(err.toJSON().message));
          dispatch(ActionCreator.setErrorHotelId(hotelId));
        }
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
    case ActionType.SET_FAVORITES_LOADING_STATUS:
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
        nearbyHotels: state.nearbyHotels.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    }
    case ActionType.SET_SENDING_ERROR_STATUS:
      return { ...state, isSendingError: action.payload };
    case ActionType.SET_REVIEW_SENDING_STATUS:
      return { ...state, isReviewSending: action.payload };
    case ActionType.SET_ERROR_MESSAGE:
      return { ...state, errorMessage: action.payload };
    case ActionType.SET_ERROR_HOTEL_ID:
      return {
        ...state,
        errorHotelIds: state.errorHotelIds.concat(action.payload),
      };
    case ActionType.REMOVE_FROM_ERROR_HOTEL_ID:
      return {
        ...state,
        errorHotelIds: state.errorHotelIds.filter(
          (item) => item !== action.payload
        ),
      };
    case ActionType.CLEAR_ERROR_HOTEL_IDS:
      return { ...state, errorHotelIds: action.payload };
    default:
      return state;
  }
};
