import { reviews } from "../mock/reviews";
import { hotels } from "../mock/offers";
import { getHotelsByCity, getHotelReviews } from "../utilites/util";

const DEFAULT_CITY = `Brussels`;
const DEFAULT_SORT = `Popular`;

export const initialState = {
  hotels,
  hotelReviews: [],
  hotelsByCity: getHotelsByCity(hotels, DEFAULT_CITY),
  currentCity: DEFAULT_CITY,
  currentSortType: DEFAULT_SORT,
  hoveredHotelId: -1,
};

export const ActionType = {
  GET_HOTELS_BY_CITY: `GET_HOTELS_BY_CITY`,
  SET_CITY: `SET_CITY`,
  GET_HOTEL_REVIEWS: `GET_HOTEL_REVIEWS`,
  SET_SORT_TYPE: `SET_SORT_TYPE`,
  SET_DEFAULT_SORT_TYPE: `SET_DEFAULT_SORT_TYPE`,
  GET_HOVERED_HOTEL_ID: `GET_HOVERED_HOTEL_ID`,
  RESET_HOVERED_HOTEL_ID: `RESET_HOVERED_HOTEL_ID`,
};

export const ActionCreator = {
  getHotels: (city) => {
    const hotelsByCity = getHotelsByCity(hotels, city);
    return {
      type: ActionType.GET_HOTELS_BY_CITY,
      payload: hotelsByCity,
    };
  },

  setCity: (city) => {
    return {
      type: ActionType.SET_CITY,
      payload: city,
    };
  },

  getHotelReviews: (hotel) => {
    const hotelReviews = getHotelReviews(hotel, reviews);
    return {
      type: ActionType.GET_HOTEL_REVIEWS,
      payload: hotelReviews,
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
    case ActionType.GET_HOTELS_BY_CITY:
      return { ...state, hotelsByCity: action.payload };
    case ActionType.SET_CITY:
      return { ...state, currentCity: action.payload };
    case ActionType.GET_HOTEL_REVIEWS:
      return { ...state, hotelReviews: action.payload };
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

// export const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case ActionType.GET_HOTELS_BY_CITY:
//       return extend(state, { hotelsByCity: action.payload });
//     case ActionType.SET_CITY:
//       return extend(state, { currentCity: action.payload });
//     case ActionType.GET_HOTEL_REVIEWS:
//       return extend(state, { hotelReviews: action.payload });
//     case ActionType.SET_SORT_TYPE:
//       return extend(state, { currentSortType: action.payload });
//     case ActionType.SET_DEFAULT_SORT_TYPE:
//       return extend(state, {
//         currentSortType: action.payload,
//         isSortOpen: false,
//       });
//     case ActionType.SET_SORT_FORM_STATUS:
//       return extend(state, { isSortOpen: !state.isSortOpen });
//     case ActionType.GET_HOVERED_HOTEL_ID:
//       return extend(state, { hoveredHotelId: action.payload });
//     default:
//       return state;
//   }
// };
