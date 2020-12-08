import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./login";
import NameSpace from "../../redux/name-space";

const mockStore = configureStore([]);

it(`Sign in page component render`, () => {
  const store = mockStore({
    [NameSpace.USER]: {
      authorizationStatus: false,
    },
    [NameSpace.APP]: {
      currentCity: "Paris",
    },
    [NameSpace.DATA]: {
      errorHotelIds: [],
    },
  });

  const tree = renderer
    .create(
      <Router>
        <Provider store={store}>
          <Login />
        </Provider>
      </Router>,
      {
        createNodeMock: () => {
          return {};
        },
      }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
