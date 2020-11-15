import renderer from "react-test-renderer";
import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import CitiesTabs from "./cities-tabs";
import NameSpace from "../../redux/name-space";

const mockStore = configureStore([]);

it(`Should Cities tabs render correctly`, () => {
  const store = mockStore({
    [NameSpace.APP]: {
      currentCity: `Amsterdam`,
    },
  });
  const tree = renderer
    .create(
      <Provider store={store}>
        <CitiesTabs />
      </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
