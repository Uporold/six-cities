import MockAdapter from "axios-mock-adapter";
import { reducer, ActionCreator, ActionType, Operation } from "./app";
import { createAPI } from "../../api";

const DEFAULT_CITY = `Brussels`;
const DEFAULT_SORT = `Popular`;

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(undefined, {})).toEqual({
    currentCity: DEFAULT_CITY,
    currentSortType: DEFAULT_SORT,
    hoveredHotelId: -1,
  });
});

it(`Reducer should change current city by a given value`, () => {
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

it(`Reducer should change sort type by a given value`, () => {
  expect(
    reducer(
      {
        currentSortType: DEFAULT_SORT,
      },
      {
        type: ActionType.SET_SORT_TYPE,
        payload: `New sort`,
      }
    )
  ).toEqual({
    currentSortType: `New sort`,
  });
});

it(`Reducer should set default sort type`, () => {
  expect(
    reducer(
      {
        currentSortType: `New sort`,
      },
      {
        type: ActionType.SET_DEFAULT_SORT_TYPE,
        payload: DEFAULT_SORT,
      }
    )
  ).toEqual({
    currentSortType: DEFAULT_SORT,
  });
});

it(`Reducer should change hovered hotel id by a given value`, () => {
  expect(
    reducer(
      {
        hoveredHotelId: -1,
      },
      {
        type: ActionType.GET_HOVERED_HOTEL_ID,
        payload: 0,
      }
    )
  ).toEqual({
    hoveredHotelId: 0,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for set city returns correct action`, () => {
    expect(ActionCreator.setCity(`Paris`)).toEqual({
      type: ActionType.SET_CITY,
      payload: `Paris`,
    });
  });

  it(`Action creator for set sort returns correct action`, () => {
    expect(ActionCreator.setSort(`New sort`)).toEqual({
      type: ActionType.SET_SORT_TYPE,
      payload: `New sort`,
    });
  });

  it(`Action creator for set default sort returns correct action`, () => {
    expect(ActionCreator.setDefaultSortType()).toEqual({
      type: ActionType.SET_DEFAULT_SORT_TYPE,
      payload: DEFAULT_SORT,
    });
  });

  it(`Action creator for get hovered hotel id returns correct action`, () => {
    expect(ActionCreator.getHoveredHotelId(0)).toEqual({
      type: ActionType.GET_HOVERED_HOTEL_ID,
      payload: 0,
    });
  });
});

