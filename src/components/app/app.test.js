import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import App from "./app";
import { hotels } from "../../mock/offers";
import { getHotelsByCity } from "../../utilites/util";

const DEFAULT_CITY = `Amsterdam`;
const DEFAULT_SORT = `Popular`;

const mockStore = configureStore([]);

it(`Render App`, () => {
  const store = mockStore({
    hotels,
    hotelReviews: [],
    hotelsByCity: getHotelsByCity(hotels, DEFAULT_CITY),
    currentCity: DEFAULT_CITY,
    currentSortType: DEFAULT_SORT,
  });

  const tree = renderer
    .create(
      <Provider store={store}>
        <App hotels={hotels} />
      </Provider>,
      {
        createNodeMock: () => {
          return document.createElement(`div`);
        },
      }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
