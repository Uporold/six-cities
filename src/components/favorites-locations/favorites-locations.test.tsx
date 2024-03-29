import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import FavoritesLocations from "./favorites-locations";
import { hotels } from "../../mock/offers";
import history from "../../history";

const city = `Paris`;

const mockStore = configureStore([]);

it(`Favorites locations`, () => {
  const store = mockStore({
    DATA: {
      errorHotelIds: [],
    },
    USER: {
      authorizationStatus: true,
    },
  });

  const tree = renderer
    .create(
      <Router history={history}>
        <Provider store={store}>
          <FavoritesLocations hotels={hotels} city={city} />
        </Provider>
      </Router>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
