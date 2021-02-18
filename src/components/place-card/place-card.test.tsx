import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import PlaceCard from "./place-card";
import { hotels } from "../../mock/offers";
import { PageType } from "../../utilites/const";
import { Store, AnyAction } from "redux";
import {Page} from "../../utilites/types";

describe(`Place Card tests`, () => {
  let store: any = null;
  const mockStore = configureStore([]);
  beforeEach(() => {
    store = mockStore({
      DATA: {
        errorHotelIds: [],
      },
      USER: {
        authorizationStatus: true,
      },
    });
  });

  it(`Should Place Card in Main render correctly`, () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router>
            <PlaceCard
              pageType={PageType.MAIN as Page}
              hotel={hotels[0]}
            />
          </Router>
        </Provider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Should Place Card in Property render correctly`, () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router>
            <PlaceCard
              pageType={PageType.PROPERTY as Page}
              hotel={hotels[0]}
            />
          </Router>
        </Provider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Should Place Card in Favorites render correctly`, () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router>
            <PlaceCard
              pageType={PageType.FAVORITES as Page}
              hotel={hotels[0]}
            />
          </Router>
        </Provider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
