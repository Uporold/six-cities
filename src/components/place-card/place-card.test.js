import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import PlaceCard from "./place-card";
import { hotels } from "../../mock/offers";
import NameSpace from "../../redux/name-space";
import { PageType } from "../../utilites/const";

describe(`Place Card tests`, () => {
  let store = null;
  const mockStore = configureStore([]);
  beforeEach(() => {
    store = mockStore({
      [NameSpace.DATA]: {
        errorHotelIds: [],
      },
    });
  });

  it(`Should Place Card in Main render correctly`, () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router>
            <PlaceCard
              pageType={PageType.MAIN}
              hotel={hotels[0]}
              onHover={() => {}}
              onHotelCardOut={() => {}}
            />
          </Router>
        </Provider>
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
              pageType={PageType.PROPERTY}
              hotel={hotels[0]}
              onHover={() => {}}
              onHotelCardOut={() => {}}
            />
          </Router>
        </Provider>
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
              pageType={PageType.FAVORITES}
              hotel={hotels[0]}
              onHover={() => {}}
              onHotelCardOut={() => {}}
            />
          </Router>
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
