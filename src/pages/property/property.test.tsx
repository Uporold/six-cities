import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Property from "./property";
import { hotels } from "../../mock/offers";
import { reviews } from "../../mock/reviews";

const mockStore = configureStore([]);

const userData = {
  id: 1,
  email: `test@gmail.com`,
  name: `test`,
  avatar: `https://assets.htmlacademy.ru/intensives/javascript-3/avatar/4.jpg`,
};

it(`Should Property Page render correctly`, () => {
  const store = mockStore({
    DATA: {
      hotels,
      hotelReviews: reviews,
      nearbyHotels: hotels.slice(1, 3),
      errorHotelIds: [],
      isSendingError: false,
      isReviewSending: false,
    },
    USER: {
      authorizationStatus: true,
      user: userData,
    },
    APP: {
      currentCity: `Paris`,
    },
  });

  const tree = renderer
    .create(
      <Provider store={store}>
        <Router>
          <Property match={{ params: { id: `1` } } }/>
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
