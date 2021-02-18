import React from "react";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import MainEmpty from "./main-empty";

const city = `Paris`;

const mockStore = configureStore([]);

it(`Favorites locations`, () => {
  const store = mockStore({
    APP: {
      currentCity: city,
    },
  });
  const tree = renderer
    .create(
      <Provider store={store}>
        <MainEmpty />
      </Provider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
