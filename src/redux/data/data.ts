import { AxiosResponse } from "axios";
import { hotelAdapter, reviewAdapter } from "../adapter/adapter";
import {
  Hotel,
  HotelBackend,
  Review,
  ReviewBackend,
  ReviewPure,
} from "../../utilites/types";
// eslint-disable-next-line import/no-cycle
import { InferActionsTypes, BaseThunkActionType } from "../reducer";

type DataActionTypes = ReturnType<InferActionsTypes<typeof ActionCreator>>;
type ThunkActionType = BaseThunkActionType<DataActionTypes>;

export interface InitialStateInterface {
  hotels: Array<Hotel>;
  favoriteHotels: Array<Hotel>;
  hotelReviews: Array<Review>;
  nearbyHotels: Array<Hotel>;
  isDataLoading: boolean;
  isFavoritesLoading: boolean;
  isSendingError: boolean;
  isReviewSending: boolean;
  errorMessage: string;
  errorHotelIds: Array<number>;
}

export const initialState: InitialStateInterface = {
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
} as const;

export const ActionCreator = {
  loadHotels: (data: Array<Hotel>) => {
    return {
      type: ActionType.LOAD_HOTELS,
      payload: data,
    };
  },

  loadFavoriteHotels: (data: Array<Hotel>) => {
    return {
      type: ActionType.LOAD_FAVORITE_HOTELS,
      payload: data,
    };
  },

  loadNearbyHotels: (data: Array<Hotel>) => {
    return {
      type: ActionType.LOAD_NEARBY_HOTELS,
      payload: data,
    };
  },

  loadHotelReviews: (data: Array<Review>) => {
    return {
      type: ActionType.LOAD_HOTEL_REVIEWS,
      payload: data,
    };
  },

  finishLoading: () => {
    return {
      type: ActionType.FINISH_LOADING,
      payload: false,
    };
  },

  setFavoritesLoadingStatus: (status: boolean) => {
    return {
      type: ActionType.SET_FAVORITES_LOADING_STATUS,
      payload: status,
    };
  },

  updateFavoriteStatus: (hotel: Hotel) => {
    return {
      type: ActionType.UPDATE_FAVORITE_STATUS,
      payload: hotel,
    };
  },

  setSendingErrorStatus: (status: boolean) => {
    return {
      type: ActionType.SET_SENDING_ERROR_STATUS,
      payload: status,
    };
  },

  setReviewSendingStatus: (status: boolean) => {
    return {
      type: ActionType.SET_REVIEW_SENDING_STATUS,
      payload: status,
    };
  },

  setErrorMessage: (message: string) => {
    return {
      type: ActionType.SET_ERROR_MESSAGE,
      payload: message,
    };
  },

  setErrorHotelId: (id: number) => {
    return {
      type: ActionType.SET_ERROR_HOTEL_ID,
      payload: id,
    };
  },

  removeErrorHotelId: (id: number) => {
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
  loadHotels: (): ThunkActionType => async (dispatch, getState, api) => {
    const response: AxiosResponse<Array<HotelBackend>> = await api.get(
      `/hotels`,
    );
    const loadedHotels = response.data.map((hotel) => hotelAdapter(hotel));
    dispatch(ActionCreator.loadHotels(loadedHotels));
    dispatch(ActionCreator.finishLoading());
  },

  loadFavoriteHotels: (): ThunkActionType => async (
    dispatch,
    getState,
    api,
  ) => {
    dispatch(ActionCreator.setFavoritesLoadingStatus(true));
    const response: AxiosResponse<Array<HotelBackend>> = await api.get(
      `/favorite`,
    );
    const loadedHotels = response.data.map((hotel) => hotelAdapter(hotel));
    dispatch(ActionCreator.loadFavoriteHotels(loadedHotels));
    dispatch(ActionCreator.setFavoritesLoadingStatus(false));
  },

  loadHotelReviews: (hotelId: number): ThunkActionType => async (
    dispatch,
    getState,
    api,
  ) => {
    const response: AxiosResponse<Array<ReviewBackend>> = await api.get(
      `/comments/${hotelId}`,
    );
    const loadedComments = response.data.map((comment) =>
      reviewAdapter(comment),
    );
    dispatch(ActionCreator.loadHotelReviews(loadedComments));
  },

  loadNearbyHotels: (hotelId: number): ThunkActionType => async (
    dispatch,
    getState,
    api,
  ) => {
    const response: AxiosResponse<Array<HotelBackend>> = await api.get(
      `/hotels/${hotelId}/nearby`,
    );
    const loadedNearbyHotels = response.data.map((nearbyHotel) =>
      hotelAdapter(nearbyHotel),
    );
    dispatch(ActionCreator.loadNearbyHotels(loadedNearbyHotels));
  },

  sendReview: (hotelId: number, review: ReviewPure): ThunkActionType => async (
    dispatch,
    getState,
    api,
  ) => {
    dispatch(ActionCreator.setReviewSendingStatus(true));
    try {
      const response: AxiosResponse<Array<ReviewBackend>> = await api.post(
        `/comments/${hotelId}`,
        {
          comment: review.comment,
          rating: review.rating,
        },
      );
      if (response.status === 200) {
        dispatch(ActionCreator.setSendingErrorStatus(false));
        dispatch(ActionCreator.setReviewSendingStatus(false));
        dispatch(Operation.loadHotelReviews(hotelId));
      }
    } catch (e) {
      dispatch(ActionCreator.setSendingErrorStatus(true));
      dispatch(ActionCreator.setReviewSendingStatus(false));
    }
  },

  changeHotelFavoriteStatus: (
    hotelId: number,
    isFavorite: boolean,
  ): ThunkActionType => async (dispatch, getState, api) => {
    try {
      const response = await api.post(
        `/favorite/${hotelId}/${isFavorite ? 1 : 0}`,
      );
      const hotel = hotelAdapter(response.data);
      dispatch(ActionCreator.updateFavoriteStatus(hotel));
    } catch (err) {
      if (err.message !== "Request failed with status code 401") {
        dispatch(ActionCreator.setErrorMessage(err.toJSON().message));
        dispatch(ActionCreator.setErrorHotelId(hotelId));
      }
    }
  },
};

export const reducer = (
  state = initialState,
  action: DataActionTypes,
): InitialStateInterface => {
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
      return {
        ...state,
        hotels: state.hotels.map((item) =>
          item.id === action.payload.id ? action.payload : item,
        ),
        favoriteHotels: state.favoriteHotels.filter(
          (item) => item.id !== action.payload.id,
        ),
        nearbyHotels: state.nearbyHotels.map((item) =>
          item.id === action.payload.id ? action.payload : item,
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
          (item) => item !== action.payload,
        ),
      };
    case ActionType.CLEAR_ERROR_HOTEL_IDS:
      return { ...state, errorHotelIds: action.payload };
    default:
      return state;
  }
};
