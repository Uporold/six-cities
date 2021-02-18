import { Sort } from "../../utilites/types";
// eslint-disable-next-line import/no-cycle
import { InferActionsTypes } from "../reducer";

export type AppActionTypes = ReturnType<InferActionsTypes<typeof ActionCreator>>;

const DEFAULT_CITY = `Brussels`;
const DEFAULT_SORT = `Popular` as Sort;

export const initialState = {
  currentCity: DEFAULT_CITY as string,
  currentSortType: DEFAULT_SORT as Sort,
  hoveredHotelId: -1 as number,
};

type InitialStateType = typeof initialState;

export const ActionType = {
  SET_CITY: `SET_CITY`,
  SET_SORT_TYPE: `SET_SORT_TYPE`,
  SET_DEFAULT_SORT_TYPE: `SET_DEFAULT_SORT_TYPE`,
  SET_HOVERED_HOTEL_ID: `SET_HOVERED_HOTEL_ID`,
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

  setHoveredHotelId: (hotelId: number) => {
    return {
      type: ActionType.SET_HOVERED_HOTEL_ID,
      payload: hotelId,
    };
  },
};

export const reducer = (
  state = initialState,
  action: AppActionTypes,
): InitialStateType => {
  switch (action.type) {
    case ActionType.SET_CITY:
      return { ...state, currentCity: action.payload };
    case ActionType.SET_SORT_TYPE:
      return { ...state, currentSortType: action.payload };
    case ActionType.SET_DEFAULT_SORT_TYPE:
      return { ...state, currentSortType: action.payload };
    case ActionType.SET_HOVERED_HOTEL_ID:
      return { ...state, hoveredHotelId: action.payload };
    default:
      return state;
  }
};
