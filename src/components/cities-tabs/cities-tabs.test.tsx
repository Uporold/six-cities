import renderer from "react-test-renderer";
import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import CitiesTabs from "./cities-tabs";

const mockStore = configureStore([]);

it(`Should Cities tabs render correctly`, () => {
  const store = mockStore({
    APP: {
      currentCity: `Amsterdam`,
    },
    DATA: {
      errorHotelIds: [],
    },
  });
  const tree = renderer
    .create(
      <Provider store={store}>
        <CitiesTabs />
      </Provider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
