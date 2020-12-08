import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import PlacesList from "./places-list";
import { hotels } from "../../mock/offers";
import { PageType } from "../../utilites/const";
import NameSpace from "../../redux/name-space";

const mockStore = configureStore([]);

it(`Should Places List render correctly`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      errorHotelIds: [],
    },
    [NameSpace.USER]: {
      authorizationStatus: true,
    },
  });
  const tree = renderer
    .create(
      <Provider store={store}>
        <Router>
          <PlacesList hotels={hotels} pageType={PageType.MAIN} />
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
