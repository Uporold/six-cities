import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./main";
import { hotels } from "../../mock/offers";
import { getHotelsByCity } from "../../utilites/util";

const DEFAULT_CITY = `Amsterdam`;
const DEFAULT_SORT = `Popular`;

const mockStore = configureStore([]);

it(`Should Main render correctly`, () => {
  const store = mockStore({
    hotels,
    hotelReviews: [],
    hotelsByCity: getHotelsByCity(hotels, DEFAULT_CITY),
    currentCity: DEFAULT_CITY,
    currentSortType: DEFAULT_SORT,
    isSortOpen: false,
  });

  const tree = renderer
    .create(
      <Provider store={store}>
        <Router>
          <Main />
        </Router>
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
