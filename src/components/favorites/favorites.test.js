import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import Favorites from "./favorites";
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
  const store = mockStore({});

  const tree = renderer
    .create(
      <Router history={history}>
        <Provider store={store}>
          <Favorites favoriteHotels={hotels} cities={cities} />
        </Provider>
      </Router>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
