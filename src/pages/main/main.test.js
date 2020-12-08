import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./main";
import { hotels } from "../../mock/offers";
import NameSpace from "../../redux/name-space";

const DEFAULT_CITY = `Amsterdam`;

const mockStore = configureStore([]);

it(`Should Main render correctly`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      hotels,
      errorHotelIds: [],
    },
    [NameSpace.APP]: {
      currentCity: DEFAULT_CITY,
    },
    [NameSpace.USER]: {
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
      }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
