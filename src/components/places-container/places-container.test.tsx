import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import PlacesContainer from "./places-container";
import { hotels } from "../../mock/offers";

const mockStore = configureStore([]);

it(`PlacesContainer render correctly`, () => {
  const store = mockStore({
    APP: {
      currentCity: `Paris`,
      currentSortType: `Popular`,
    },
    DATA: {
      hotels,
      errorHotelIds: [],
    },
    USER: {
      authorizationStatus: true,
    },
  });
  const tree = renderer
    .create(
      <Provider store={store}>
        <Router>
          <PlacesContainer />
        </Router>
      </Provider>,
      {
        createNodeMock: () => {
          return document.createElement(`div`);
        },
      },
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
