import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./main";
import { hotels } from "../../mock/offers";

const DEFAULT_CITY = `Amsterdam`;

const mockStore = configureStore([]);

it(`Should Main render correctly`, () => {
  const store = mockStore({
    DATA: {
      hotels,
      errorHotelIds: [],
    },
    APP: {
      currentCity: DEFAULT_CITY,
    },
    USER: {
      authorizationStatus: false,
    },
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
          return {};
        },
      },
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
