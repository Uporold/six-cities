import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import Favorites from "./favorites";
import { hotels } from "../../mock/offers";
import history from "../../history";

const userData = {
  id: 1,
  email: `test@gmail.com`,
  name: `test`,
  avatar: `https://assets.htmlacademy.ru/intensives/javascript-3/avatar/4.jpg`,
};

const mockStore = configureStore([]);

it(`Favorites locations`, () => {
  const store = mockStore({
    DATA: {
      favoriteHotels: hotels,
      isFavoritesLoading: false,
      errorHotelIds: [],
    },
    USER: {
      authorizationStatus: true,
      user: userData,
    },
  });

  const tree = renderer
    .create(
      <Router history={history}>
        <Provider store={store}>
          <Favorites />
        </Provider>
      </Router>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
