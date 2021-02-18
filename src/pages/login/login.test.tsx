import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./login";

const mockStore = configureStore([]);

it(`Sign in page component render`, () => {
  const store = mockStore({
    USER: {
      authorizationStatus: false,
    },
    APP: {
      currentCity: "Paris",
    },
    DATA: {
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
      },
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
