const DEFAULT_CITY = `Brussels`;
const DEFAULT_SORT = `Popular`;

export const initialState = {
  currentCity: DEFAULT_CITY,
  currentSortType: DEFAULT_SORT,
  hoveredHotelId: -1,
};

export const ActionType = {
  SET_CITY: `SET_CITY`,
  SET_SORT_TYPE: `SET_SORT_TYPE`,
  SET_DEFAULT_SORT_TYPE: `SET_DEFAULT_SORT_TYPE`,
  GET_HOVERED_HOTEL_ID: `GET_HOVERED_HOTEL_ID`,
  RESET_HOVERED_HOTEL_ID: `RESET_HOVERED_HOTEL_ID`,
};

export const ActionCreator = {
  setCity: (city) => {
    return {
      type: ActionType.SET_CITY,
      payload: city,
    };
  },

  setSort: (sortType) => {
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

  getHoveredHotelId: (hotelId) => {
    return {
      type: ActionType.GET_HOVERED_HOTEL_ID,
      payload: hotelId,
    };
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_CITY:
      return { ...state, currentCity: action.payload };
    case ActionType.SET_SORT_TYPE:
      return { ...state, currentSortType: action.payload };
    case ActionType.SET_DEFAULT_SORT_TYPE:
      return { ...state, currentSortType: action.payload };
    case ActionType.GET_HOVERED_HOTEL_ID:
      return { ...state, hoveredHotelId: action.payload };
    default:
      return state;
  }
};
