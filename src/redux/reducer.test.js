import { initialState, ActionType, reducer } from "./reducer";
import { getHotelReviews, getHotelsByCity } from "../utilites/util";
import { reviews } from "../mock/reviews";
import { hotels } from "../mock/offers";

const DEFAULT_CITY = `Amsterdam`;

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});

it(`Reducer should return right active city`, () => {
  expect(
    reducer(
      {
        currentCity: DEFAULT_CITY,
      },
      {
        type: ActionType.SET_CITY,
        payload: `Paris`,
      }
    )
  ).toEqual({
    currentCity: `Paris`,
  });
});

it(`Reducer should return right city hotels`, () => {
  expect(
    reducer(
      {
        hotelsByCity: getHotelsByCity(hotels, DEFAULT_CITY),
      },
      {
        type: ActionType.GET_HOTELS_BY_CITY,
        payload: getHotelsByCity(hotels, `Paris`),
      }
    )
  ).toEqual({
    hotelsByCity: getHotelsByCity(hotels, `Paris`),
  });
});

it(`Reducer should return right hotel reviews`, () => {
  expect(
    reducer(
      {
        hotelReviews: [],
      },
      {
        type: ActionType.GET_HOTEL_REVIEWS,
        payload: getHotelReviews(hotels[0], reviews),
      }
    )
  ).toEqual({
    hotelReviews: reviews[0].comments,
  });
});