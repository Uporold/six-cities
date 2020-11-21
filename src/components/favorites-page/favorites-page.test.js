import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import FavoritesPage from "./favorites-page";
import { hotels } from "../../mock/offers";
import history from "../../history";
import NameSpace from "../../redux/name-space";

const userData = {
  id: 1,
  email: `test@gmail.com`,
  name: `test`,
  avatar: `https://assets.htmlacademy.ru/intensives/javascript-3/avatar/4.jpg`,
};

const mockStore = configureStore([]);

it(`Favorites locations`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      favoriteHotels: hotels,
      isFavoritesLoading: false,
      errorHotelIds: [],
    },
    [NameSpace.USER]: {
      authorizationStatus: true,
      user: userData,
    },
  });

  store.dispatch = jest.fn();

  const tree = renderer
    .create(
      <Router history={history}>
        <Provider store={store}>
          <FavoritesPage />
        </Provider>
      </Router>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
