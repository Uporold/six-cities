import { AxiosInstance, AxiosPromise, AxiosResponse } from "axios";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { hotelAdapter, reviewAdapter } from "../adapter/adapter";
import {
  Hotel,
  HotelBackend,
  Review,
  ReviewBackend,
  ReviewPure,
} from "../../utilites/types";
import { GlobalState } from "../reducer";

interface DataActionInterface {
  type: string;
  payload: boolean | number | string | Hotel | Array<Hotel> | Array<Review>;
}

interface BooleanActionInterface {
  type: string;
  payload: boolean;
}

interface NumberActionInterface {
  type: string;
  payload: number;
}

interface StringActionInterface {
  type: string;
  payload: string;
}

interface HotelActionInterface {
  type: string;
  payload: Hotel;
}

interface HotelsActionInterface {
  type: string;
  payload: Array<Hotel>;
}

interface ReviewsActionInterface {
  type: string;
  payload: Array<Review>;
}

type DataActionTypes =
  | BooleanActionInterface
  | NumberActionInterface
  | StringActionInterface
  | HotelActionInterface
  | HotelsActionInterface
  | ReviewsActionInterface;

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
};

export const ActionCreator = {
  loadHotels: (data: Array<Hotel>): DataActionInterface => {
    return {
      type: ActionType.LOAD_HOTELS,
      payload: data,
    };
  },

  loadFavoriteHotels: (data: Array<Hotel>): DataActionInterface => {
    return {
      type: ActionType.LOAD_FAVORITE_HOTELS,
      payload: data,
    };
  },

  loadHotelReviews: (data: Array<Review>): DataActionInterface => {
    return {
      type: ActionType.LOAD_HOTEL_REVIEWS,
      payload: data,
    };
  },

  loadNearbyHotels: (data: Array<Hotel>): DataActionInterface => {
    return {
      type: ActionType.LOAD_NEARBY_HOTELS,
      payload: data,
    };
  },

  finishLoading: (): DataActionInterface => {
    return {
      type: ActionType.FINISH_LOADING,
      payload: false,
    };
  },

  setFavoritesLoadingStatus: (status: boolean): DataActionInterface => {
    return {
      type: ActionType.SET_FAVORITES_LOADING_STATUS,
      payload: status,
    };
  },

  updateFavoriteStatus: (hotel: Hotel): HotelActionInterface => {
    return {
      type: ActionType.UPDATE_FAVORITE_STATUS,
      payload: hotel,
    };
  },

  setSendingErrorStatus: (status: boolean): DataActionInterface => {
    return {
      type: ActionType.SET_SENDING_ERROR_STATUS,
      payload: status,
    };
  },

  setReviewSendingStatus: (status: boolean): DataActionInterface => {
    return {
      type: ActionType.SET_REVIEW_SENDING_STATUS,
      payload: status,
    };
  },

  setErrorMessage: (message: string): DataActionInterface => {
    return {
      type: ActionType.SET_ERROR_MESSAGE,
      payload: message,
    };
  },

  setErrorHotelId: (id: number): DataActionInterface => {
    return {
      type: ActionType.SET_ERROR_HOTEL_ID,
      payload: id,
    };
  },

  removeErrorHotelId: (id: number): DataActionInterface => {
    return {
      type: ActionType.REMOVE_FROM_ERROR_HOTEL_ID,
      payload: id,
    };
  },

  clearErrorHotelIds: (): DataActionInterface => {
    return {
      type: ActionType.CLEAR_ERROR_HOTEL_IDS,
      payload: [],
    };
  },
};

export const Operation = {
  loadHotels: (): ThunkAction<
    void,
    GlobalState,
    AxiosInstance,
    DataActionInterface
  > => async (
    dispatch: ThunkDispatch<GlobalState, AxiosInstance, DataActionInterface>,
    getState: () => GlobalState,
    api: { get: (arg0: string) => AxiosPromise },
  ): Promise<void> => {
    const response: AxiosResponse<Array<HotelBackend>> = await api.get(
      `/hotels`,
    );
    const loadedHotels = response.data.map((hotel) => hotelAdapter(hotel));
    dispatch(ActionCreator.loadHotels(loadedHotels));
    dispatch(ActionCreator.finishLoading());
  },

  loadFavoriteHotels: (): ThunkAction<
    void,
    GlobalState,
    AxiosInstance,
    DataActionInterface
  > => async (
    dispatch: ThunkDispatch<GlobalState, AxiosInstance, DataActionInterface>,
    getState: () => GlobalState,
    api: { get: (arg0: string) => AxiosPromise },
  ): Promise<void> => {
    dispatch(ActionCreator.setFavoritesLoadingStatus(true));
    const response: AxiosResponse<Array<HotelBackend>> = await api.get(
      `/favorite`,
    );
    const loadedHotels = response.data.map((hotel) => hotelAdapter(hotel));
    dispatch(ActionCreator.loadFavoriteHotels(loadedHotels));
    dispatch(ActionCreator.setFavoritesLoadingStatus(false));
  },

  loadHotelReviews: (
    hotelId: number,
  ): ThunkAction<
    void,
    GlobalState,
    AxiosInstance,
    DataActionInterface
  > => async (
    dispatch: ThunkDispatch<GlobalState, AxiosInstance, DataActionInterface>,
    getState: () => GlobalState,
    api: { get: (arg0: string) => AxiosPromise },
  ): Promise<void> => {
    const response: AxiosResponse<Array<ReviewBackend>> = await api.get(
      `/comments/${hotelId}`,
    );
    const loadedComments = response.data.map((comment) =>
      reviewAdapter(comment),
    );
    dispatch(ActionCreator.loadHotelReviews(loadedComments));
  },

  loadNearbyHotels: (
    hotelId: number,
  ): ThunkAction<
    void,
    GlobalState,
    AxiosInstance,
    DataActionInterface
  > => async (
    dispatch: ThunkDispatch<GlobalState, AxiosInstance, DataActionInterface>,
    getState: () => GlobalState,
    api: { get: (arg0: string) => AxiosPromise },
  ): Promise<void> => {
    const response: AxiosResponse<Array<HotelBackend>> = await api.get(
      `/hotels/${hotelId}/nearby`,
    );
    const loadedNearbyHotels = response.data.map((nearbyHotel) =>
      hotelAdapter(nearbyHotel),
    );
    dispatch(ActionCreator.loadNearbyHotels(loadedNearbyHotels));
  },

  sendReview: (
    hotelId: number,
    review: ReviewPure,
  ): ThunkAction<
    void,
    GlobalState,
    AxiosInstance,
    DataActionInterface
  > => async (
    dispatch: ThunkDispatch<GlobalState, AxiosInstance, DataActionInterface>,
    getState: () => GlobalState,
    api: {
      post: (arg0: string, arg1: ReviewPure) => AxiosPromise;
    },
  ): Promise<void> => {
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
  ): ThunkAction<
    void,
    GlobalState,
    AxiosInstance,
    DataActionInterface
  > => async (
    dispatch: ThunkDispatch<GlobalState, AxiosInstance, DataActionInterface>,
    getState: () => GlobalState,
    api: { post: (arg0: string) => AxiosPromise },
  ): Promise<void> => {
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
      return { ...state, nearbyHotels: action.payload as Array<Hotel> };
    case ActionType.FINISH_LOADING:
      return { ...state, isDataLoading: action.payload as boolean };
    case ActionType.SET_FAVORITES_LOADING_STATUS:
      return { ...state, isFavoritesLoading: action.payload as boolean };
    case ActionType.UPDATE_FAVORITE_STATUS: {
      return {
        ...state,
        hotels: state.hotels.map((item) =>
          item.id === action.payload.id ? action.payload : item,
        ) as Array<Hotel>,
        favoriteHotels: state.favoriteHotels.filter(
          (item) => item.id !== action.payload.id,
        ),
        nearbyHotels: state.nearbyHotels.map((item) =>
          item.id === action.payload.id ? action.payload : item,
        ) as Array<Hotel>,
      };
    }
    case ActionType.SET_SENDING_ERROR_STATUS:
      return { ...state, isSendingError: action.payload as boolean };
    case ActionType.SET_REVIEW_SENDING_STATUS:
      return { ...state, isReviewSending: action.payload as boolean };
    case ActionType.SET_ERROR_MESSAGE:
      return { ...state, errorMessage: action.payload as string };
    case ActionType.SET_ERROR_HOTEL_ID:
      return {
        ...state,
        errorHotelIds: state.errorHotelIds.concat(action.payload as number),
      };
    case ActionType.REMOVE_FROM_ERROR_HOTEL_ID:
      return {
        ...state,
        errorHotelIds: state.errorHotelIds.filter(
          (item) => item !== action.payload,
        ),
      };
    case ActionType.CLEAR_ERROR_HOTEL_IDS:
      return { ...state, errorHotelIds: action.payload as Array<never> };
    default:
      return state;
  }
};

// TODO fix payload id
