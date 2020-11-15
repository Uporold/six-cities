import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import AddReview from "./add-review";
import NameSpace from "../../redux/name-space";
import { hotels } from "../../mock/offers";

describe(`Add Review tests`, () => {
  const mockStore = configureStore([]);
  let store = null;
  let addReviewComponent = null;

  beforeEach(() => {
    store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: false,
        isAuthorizationLoading: false,
      },
      [NameSpace.DATA]: {
        hotels,
        isSendingError: false,
        isReviewSending: false,
      },
    });
    store.dispatch = jest.fn();
    addReviewComponent = renderer.create(
      <Provider store={store}>
        <AddReview hotelId={1} />
      </Provider>,
      {
        createNodeMock: () => {
          return {};
        },
      }
    );
  });

  it(`Render Add Review page`, () => {
    expect(addReviewComponent.toJSON()).toMatchSnapshot();
  });
});
