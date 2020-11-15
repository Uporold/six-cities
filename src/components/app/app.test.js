import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import App from "./app";
import { hotels } from "../../mock/offers";
import NameSpace from "../../redux/name-space";

const mockStore = configureStore([]);

it(`Render App`, () => {
  const store = mockStore({
    [NameSpace.APP]: {
      currentCity: `Amsterdam`,
      currentSortType: `Popular`,
    },
    [NameSpace.USER]: {
      authorizationStatus: false,
      isAuthorizationLoading: false,
    },
    [NameSpace.DATA]: {
      isDataLoading: false,
      hotels,
    },
  });

  const tree = renderer
    .create(
      <Provider store={store}>
        <App />
      </Provider>,
      {
        createNodeMock: () => {
          return {};
        },
      }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
