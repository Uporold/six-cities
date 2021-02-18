import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import PlaceCardError from "./place-card-error";

const mockStore = configureStore([]);

it(`PlaceCardError render correctly`, () => {
  const store = mockStore({
    DATA: {
      errorHotelIds: [0, 1, 2, 3],
      errorMessage: `Test error`,
    },
    USER: {
      authorizationStatus: true,
    },
  });
  const tree = renderer
    .create(
      <Provider store={store}>
        <PlaceCardError hotelId={0} />
      </Provider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
