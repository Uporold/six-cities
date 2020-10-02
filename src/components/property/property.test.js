import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Property from "./property";
import { hotels } from "../../mock/offers";

const mockStore = configureStore([]);

it(`Should Property Page render correctly`, () => {
  const store = mockStore({
    hotelReviews: [],
  });
  const tree = renderer
    .create(
      <Provider store={store}>
        <Router>
          <Property
            hotel={hotels[0]}
            hotels={hotels}
            onPlaceCardClick={() => {}}
          />
        </Router>
      </Provider>,
      {
        createNodeMock: () => {
          return document.createElement(`div`);
        },
      }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
