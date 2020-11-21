import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import Sorting from "./sorting";
import NameSpace from "../../redux/name-space";

const mockStore = configureStore([]);

it(`Should Places List render correctly`, () => {
  const store = mockStore({
    [NameSpace.APP]: {
      currentSortType: `Popular`,
    },
  });
  const tree = renderer
    .create(
      <Provider store={store}>
        <Sorting />
      </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
