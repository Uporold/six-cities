import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import PropertyReviews from "./property-reviews";
import { reviews } from "../../mock/reviews";

const mockStore = configureStore([]);

const userData = {
  id: 1,
  email: `test@gmail.com`,
  name: `test`,
  avatar: `https://assets.htmlacademy.ru/intensives/javascript-3/avatar/4.jpg`,
};

it(`Should Reviews List render correctly`, () => {
  const store = mockStore({
    DATA: {
      isSendingError: false,
      isReviewSending: false,
    },
    USER: {
      authorizationStatus: true,
      user: userData,
    },
  });
  const tree = renderer
    .create(
      <Provider store={store}>
        <PropertyReviews reviews={reviews} hotelId={1} />
      </Provider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
