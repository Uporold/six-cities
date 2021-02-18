import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import Sorting from "./sorting";

const mockStore = configureStore([]);

it(`Should Places List render correctly`, () => {
  const store = mockStore({
    APP: {
      currentSortType: `Popular`,
    },
  });
  const tree = renderer
    .create(
      <Provider store={store}>
        <Sorting currentCity="Paris" />
      </Provider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
