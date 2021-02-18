import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import AddReview from "./add-review";
import { hotels } from "../../mock/offers";

const userData = {
  id: 1,
  email: `test@gmail.com`,
  name: `test`,
  avatar: `https://assets.htmlacademy.ru/intensives/javascript-3/avatar/4.jpg`,
};

describe(`Add Review tests`, () => {
  const mockStore = configureStore([]);
  let store = null;
  let addReviewComponent = null;

  beforeEach(() => {
    store = mockStore({
      USER: {
        authorizationStatus: true,
        isAuthorizationLoading: false,
        user: userData,
      },
      DATA: {
        hotels,
        isSendingError: false,
        isReviewSending: false,
      },
    });
    addReviewComponent = renderer.create(
      <Provider store={store}>
        <AddReview hotelId={1} />
      </Provider>,
      {
        createNodeMock: () => {
          return {};
        },
      },
    );
  });

  it(`Render Add Review page`, () => {
    expect(addReviewComponent.toJSON()).toMatchSnapshot();
  });
});
