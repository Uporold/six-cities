import { Sort } from "../../utilites/types";
// eslint-disable-next-line import/no-cycle
import { InferActionsTypes } from "../reducer";

type AppActionTypes = ReturnType<InferActionsTypes<typeof ActionCreator>>;

export interface InitialStateInterface {
  currentCity: string;
  currentSortType: Sort;
  hoveredHotelId: number;
}

const DEFAULT_CITY = `Brussels`;
const DEFAULT_SORT = `Popular`;

export const initialState: InitialStateInterface = {
  currentCity: DEFAULT_CITY,
  currentSortType: DEFAULT_SORT,
  hoveredHotelId: -1,
};

export const ActionType = {
  SET_CITY: `SET_CITY`,
  SET_SORT_TYPE: `SET_SORT_TYPE`,
  SET_DEFAULT_SORT_TYPE: `SET_DEFAULT_SORT_TYPE`,
  GET_HOVERED_HOTEL_ID: `GET_HOVERED_HOTEL_ID`,
} as const;

export const ActionCreator = {
  setCity: (city: string) => {
    return {
      type: ActionType.SET_CITY,
      payload: city,
    };
  },

  setSort: (sortType: Sort) => {
    return {
      type: ActionType.SET_SORT_TYPE,
      payload: sortType,
    };
  },

  setDefaultSortType: () => {
    return {
      type: ActionType.SET_DEFAULT_SORT_TYPE,
      payload: DEFAULT_SORT,
    };
  },

  getHoveredHotelId: (hotelId: number) => {
    return {
      type: ActionType.GET_HOVERED_HOTEL_ID,
      payload: hotelId,
    };
  },
};

export const reducer = (
  state = initialState,
  action: AppActionTypes,
): InitialStateInterface => {
  switch (action.type) {
    case ActionType.SET_CITY:
      return { ...state, currentCity: action.payload as string };
    case ActionType.SET_SORT_TYPE:
      return { ...state, currentSortType: action.payload as Sort };
    case ActionType.SET_DEFAULT_SORT_TYPE:
      return { ...state, currentSortType: action.payload as Sort };
    case ActionType.GET_HOVERED_HOTEL_ID:
      return { ...state, hoveredHotelId: action.payload as number };
    default:
      return state;
  }
};
