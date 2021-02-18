import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import FavoritesLists from "./favorites-lists";
import { hotels } from "../../mock/offers";
import history from "../../history";

const cities = [
  `Paris`,
  `Cologne`,
  `Brussels`,
  `Amsterdam`,
  `Hamburg`,
  `Dusseldorf`,
];

const mockStore = configureStore([]);

it(`Favorites section`, () => {
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
          <FavoritesLists favoriteHotels={hotels} cities={cities} />
        </Provider>
      </Router>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
