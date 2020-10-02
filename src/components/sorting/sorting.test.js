import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import Sorting from "./sorting";

const currentSortType = `Popular`;
const mockStore = configureStore([]);

it(`Should Places List render correctly`, () => {
  const store = mockStore({
    isSortOpen: true,
  });
  const tree = renderer
    .create(
      <Provider store={store}>
        <Sorting
          currentSortType={currentSortType}
          onSortingTabClick={() => {}}
        />
      </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
