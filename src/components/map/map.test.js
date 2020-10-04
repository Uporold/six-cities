import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import Map from "./map";
import { hotels } from "../../mock/offers";

const mockStore = configureStore([]);

it(`Should Map render correctly`, () => {
  const store = mockStore({
    hoveredHotelId: 1,
  });
  const tree = renderer
    .create(
      <Provider store={store}>
        <Map hotels={hotels} center={[52.38333, 4.9]} zoom={12} />
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
